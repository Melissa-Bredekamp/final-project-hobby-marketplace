import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';
import snakeCaseKeys from 'snakecase-keys';
import { Session, User, Hobby } from './types';

import extractHerokuDatabaseEnvVars from './setPostgresDefaultsOnHeroku';

extractHerokuDatabaseEnvVars();

dotenv.config();

const sql =
  process.env.NODE_ENV === 'production'
    ? // Heroku needs SSL connections but
      // has an "unauthorized" certificate
      // https://devcenter.heroku.com/changelog-items/852
      postgres({ ssl: { rejectUnauthorized: false } })
    : postgres({
        idle_timeout: 5,
      });

export async function registerUser(username: string, passwordHash: string) {
  const users = await sql<User[]>`
     INSERT INTO users
       (username, password_hash)
     VALUES
       (${username}, ${passwordHash})
     RETURNING *;
   `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function getSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
      SELECT * FROM sessions WHERE token = ${token};
    `;
  return sessions.map((s) => camelcaseKeys(s))[0];
}

export async function deleteSessionByToken(token: string | undefined) {
  if (typeof token === 'undefined') return;
  await sql`
      DELETE FROM sessions WHERE token = ${token};
    `;
}

export async function deleteExpiredSessions() {
  await sql`
      DELETE FROM sessions WHERE expiry_timestamp < NOW();
    `;
}

export async function insertSession(token: string, userId: number) {
  const sessions = await sql<Session[]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING *;
  `;

  return sessions.map((s) => camelcaseKeys(s))[0];
}

export async function getUserBySessionToken(token: string | undefined) {
  if (typeof token === 'undefined') return undefined;

  const users = await sql<User[]>`
    SELECT
      users.id,
      users.first_name,
      users.last_name,
      users.email,
      users.interests,
      users.date_of_birth,
      users.username,
      users.city
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      users.id = sessions.user_id;
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function getHobbyBySessionToken(token: string | undefined) {
  if (typeof token === 'undefined') return undefined;

  const hobby = await sql<Hobby[]>`
    SELECT
      users.id,
      hobby.hobby_id,
      hobby.city,
      hobby.availability,
      hobby.hobby_offer,
      hobby.about_me
    FROM
      hobby,
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      users.id = sessions.user_id;
  `;

  return hobby.map((h) => camelcaseKeys(h))[0];
}

export async function getHobby() {
  const hobby = await sql`
    SELECT * FROM hobby;
  `;
  return hobby.map((h) => camelcaseKeys(h));
}

export async function getHobbyById(hobbyId: string) {
  if (!/^\d+$/.test(hobbyId)) return undefined;

  const hobby = await sql<Hobby[]>`
    SELECT
      users.id host_id,
      users.first_name host_first_name,
      users.last_name host_last_name,
      hobby.hobby_id,
      hobby.city,
      hobby.availability,
      hobby.hobby_offer,
      hobby.about_me
    FROM
      hobby,
      users
    WHERE
      users.id = hobby.user_id AND
      hobby_id = ${parseInt(hobbyId)}
  `;

  // console.log('hobby', hobby.map((h) => camelcaseKeys(h))[0]);

  return hobby.map((h) => camelcaseKeys(h))[0];
}

export async function getUsers() {
  const users = await sql`
    SELECT * FROM users;
  `;
  return users.map((u) => camelcaseKeys(u));
}

export async function getUserById(id: string) {
  // Return undefined if the id is not
  // in the correct format
  if (!/^\d+$/.test(id)) return undefined;

  const users = await sql<User[]>`
    SELECT * FROM users WHERE id = ${id};
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export function userToReactProps(user = {}) {
  return Object.assign({}, user, {
    dateOfBirth: user.dateOfBirth
      ? user.dateOfBirth.toISOString().substr(0, 10)
      : user.dateOfBirth,
  });
}

export async function getUserByUsername(username: string) {
  const users = await sql<User[]>`
    SELECT * FROM users WHERE username = ${username};
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function updateUserById(id: string, user: User) {
  console.log('updateUserById', id, user);
  // Return undefined if the id is not
  // in the correct format
  if (!/^\d+$/.test(id)) return undefined;

  const allowedProperties = [
    'first_name',
    'last_name',
    'photo',
    'email',
    'date_of_birth',
    'city',
    'interests',
  ];
  let users: User[] = [];

  const snakeKeysUser = snakeCaseKeys(user);

  console.log(
    'sql update values',
    // sql(
    //   snakeKeysUser,
    ...Object.keys(user).filter((key) => allowedProperties.includes(key)),
    // ),
  );

  users = await sql<User[]>`
    UPDATE users SET ${sql(
      snakeKeysUser,
      ...Object.keys(user).filter((key) => allowedProperties.includes(key)),
    )}
   WHERE id = ${id} RETURNING *;
`;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function insertHobby(userId, hobbies: Hobby) {
  const requiredHobbyProperties = [
    'user_id',
    'hobby_offer',
    'availability',
    'about_me',
    'city',
  ];

  hobbies.userId = userId;
  const snakeKeysHobby = snakeCaseKeys(hobbies);
  const hobbyProperties = Object.keys(snakeKeysHobby);

  if (
    requiredHobbyProperties.some(
      (requiredKey) => !hobbyProperties.includes(requiredKey),
    )
  ) {
    console.log(
      'insertHobby error missing properties',
      hobbyProperties,
      requiredHobbyProperties,
    );
    return undefined;
  }
  console.log('hobby2', snakeKeysHobby);

  const hobby = await sql<Hobby[]>`
      INSERT INTO hobby ${sql(
        snakeKeysHobby,
        ...Object.keys(snakeKeysHobby).filter((key) =>
          requiredHobbyProperties.includes(key),
        ),
      )}
      RETURNING *;
      `;

  return hobby.map((h) => camelcaseKeys(h))[0];
}

export async function deleteUserById(id: string) {
  // Return undefined if the id is not
  // in the correct format
  if (!/^\d+$/.test(id)) return undefined;

  const users = await sql<User[]>`
    DELETE FROM users
      WHERE id = ${id}
      RETURNING *;
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function getNewsfeedHobbyById() {
  const hobby = await sql<Hobby[]>`
    SELECT
    hobby.hobby_id as hobby_id,
    users.id as host_id,
    hobby.hobby_offer,
    users.photo as host_photo,
      users.first_name as host_first_name,
      users.last_name as host_last_name,
      hobby.city,
      hobby.availability
      FROM
      hobby,
      users
      -- hobby_photos
      WHERE users.id = hobby.user_id 
      -- AND
      -- hobby.hobby_id = hobby_photos.hobby_id
      ORDER BY
      hobby_id desc 
  `;
  console.log('hobby', hobby.map((h) => camelcaseKeys(h))[0]);

  return hobby.map((h) => camelcaseKeys(h));
}

// export async function insertUserPhotoUrlByUserId(userId, url, token) {
//   const photoUrl = await sql`
//   UPDATE users
//   SET photo_title =  ${url}
// WHERE user_id = (SELECT user_id FROM sessions WHERE
//   sessions.token = ${token} ) ;`;
// }

// export async function insertHobbyPhotoUrlByUserId(userId, url, token) {
//   console.log(userId, url, token);
//   const photoUrl = await sql`

//   UPDATE users
//   SET photo_title =  ${url}
// WHERE user_id = (SELECT user_id FROM sessions WHERE
//   sessions.token = ${token} ) ;`;
// }
