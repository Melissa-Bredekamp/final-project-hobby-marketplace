import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';
import snakeCaseKeys from 'snakecase-keys';

import { Session, User, Hobby } from './types';
import { log } from 'console';
// import extractHerokuDatabaseEnvVars from './extractHerokuDatabaseEnvVars';

// extractHerokuDatabaseEnvVars();

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
  console.log(user, 'abc');
  const allowedProperties = [
    'first_name',
    'last_name',
    'photo',
    'email',
    'date_of_birth',
    'city',
    'interests',
  ];
  // const userProperties = Object.keys(user);

  // if (userProperties.length < 1) {
  //   return undefined;
  // }

  // const difference = userProperties.filter(
  //   (prop) => !allowedProperties.includes(prop),
  // );

  // if (difference.length > 0) {
  //   return undefined;
  // }

  let users: User[] = [];

  const snakeKeysUser = snakeCaseKeys(user);

  const sqlUpdateValues = [];

  // if (allowedProperties.includes(sqlUpdateValues))
  users = await sql<User[]>`
    UPDATE users SET ${sql(
      snakeKeysUser,
      // 'first_name',
      // 'last_name',
      // 'date_of_birth',
      // 'email',
      // 'city',
      // 'interests',
      ...Object.keys(user).filter((key) => allowedProperties.includes(key)),
    )}
   WHERE id = ${user.id} RETURNING *;
`;

  // console.log('x snakeCaseKeys test', snakeCaseKeys('dateOfBirth'));

  // const sqlUpdateValues = [];
  // Object.keys(snakeKeysUser).forEach((key) => {
  //   if (allowedProperties.includes(key)) {
  //     sqlUpdateValues.push(`${key} = '${snakeKeysUser[key]}'`);
  //   }
  // });

  // if (sqlUpdateValues.length < 1) {
  //   console.log(
  //     'update users failed, no valid properties to update',
  //     id,
  //     snakeKeysUser,
  //   );
  //   return undefined;
  // }

  // const sqlUpdate = `UPDATE users SET ${sqlUpdateValues.join(
  //   ', ',
  // )} WHERE id = ${id} RETURNING *;`;

  // console.log('update sql', sqlUpdate);

  // users = await sql<User[]>`${sqlUpdate}`;

  // if ('firstName' in user) {
  //   users = await sql<User[]>`
  //     UPDATE users
  //       SET first_name = ${user.firstName}
  //       WHERE id = ${id}
  //       RETURNING *;
  //   `;
  // }

  // if ('lastName' in user) {
  //   users = await sql<User[]>`
  //     UPDATE users
  //       SET last_name = ${user.lastName}
  //       WHERE id = ${id}
  //       RETURNING *;
  //   `;
  // }

  // if ('email' in user) {
  //   users = await sql<User[]>`
  //     UPDATE users
  //       SET email = ${user.email}
  //       WHERE id = ${id}
  //       RETURNING *;
  //   `;
  // }

  // if ('photo' in user) {
  //   users = await sql<User[]>`
  //     UPDATE users
  //       SET photo = ${user.photo}
  //       WHERE id = ${id}
  //       RETURNING *;
  //   `;
  // }

  // if ('dateOfBirth' in user) {
  //   users = await sql<User[]>`
  //     UPDATE users
  //       SET date_of_birth = ${user.dateOfBirth},
  //       photo = adfasdf
  //       WHERE id = ${id}
  //       RETURNING *;
  //   `;
  // }

  // if ('city' in user) {
  //   users = await sql<User[]>`
  //     UPDATE users
  //       SET city = ${user.city}
  //       WHERE id = ${id}
  //       RETURNING *;
  //   `;
  // }

  // if ('interests' in user) {
  //   users = await sql<User[]>`
  //     UPDATE users
  //       SET interests = ${user.interests}
  //       WHERE id = ${id}
  //       RETURNING *;
  //   `;
  // }

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function insertHobby(hobbies: Hobby) {
  const requiredHobbyProperties = [
    'hobbyOffer',
    'availability',
    'aboutMe',
    'city',
  ];
  const hobbyProperties = Object.keys(hobbies);

  if (hobbyProperties.length !== requiredHobbyProperties.length) {
    return undefined;
  }

  if (hobbyProperties.length > 0) {
    return undefined;
  }

  const hobby = await sql<Hobby[]>`
      INSERT INTO hobby
      (hobbyOffer,
      availability,
      aboutMe,
      city,)
      VALUES
      (${hobbies.hobbyOffer}, ${hobbies.city}, ${hobbies.availability}, ${hobbies.aboutMe})
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
