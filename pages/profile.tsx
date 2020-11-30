import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { isSessionTokenValid } from '../utilities/auth';
import Layout from '../components/Layout';
import { User } from '../utilities/types';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Profile(props: { user: User; loggedIn: boolean }) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [firstName, setFirstName] = useState(props.user?.firstName);
  const [lastName, setLastName] = useState(props.user?.lastName);
  const [email, setEmail] = useState(props.user?.email);
  const [dateOfBirth, setDateOfBirth] = useState(props.user?.dateOfBirth);
  const [city, setCity] = useState(props.user?.city);
  const [photo, setPhoto] = useState(props.user.photo);
  const [interests, setInterests] = useState(props.user?.interests);
  const router = useRouter();

  if (!props.user) {
    return (
      <Layout>
        <Head>
          <title>User not found</title>
          <link rel="icon" href="/favicon.svg" />
        </Head>
        User not found.
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Layout>
        <div className="profileTextStyles">
          <div className="formStyles">
            <h2>
              {firstName} {lastName}
            </h2>
            {/* {editingKey !== 'name' ? (
              <>
                <input
                  value={firstName}
                  onChange={(event) => setFirstName(event.currentTarget.value)}
                />
                <input
                  value={lastName}
                  onChange={(event) => setLastName(event.currentTarget.value)}
                />
                <button
                  className="editButtonStyles"
                  onClick={async () => {
                    await fetch(`/api/users/${props.user.id}`, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        user: { firstName: firstName, lastName: lastName },
                      }),
                    });

                    setEditingKey(null);
                  }}
                >
                  save
                </button>
                <button
                  className="editButtonStyles"
                  onClick={() => {
                    setEditingKey(null);
                    setFirstName(props.user.firstName);
                    setLastName(props.user.lastName);
                  }}
                >
                  cancel
                </button>
              </>
            ) : (
              <button
                className="editButtonStyles"
                onClick={() => {
                  setEditingKey('name');
                }}
              >
                edit
              </button>
            )} */}
            <br />
            <button
              onClick={async (e) => router.push('/create-hobby')}
              data-cy="new-user-form-button"
              className="centeredButtonStyles"
            >
              Create hobby offer
            </button>
            <br />
            <img className="imageStyles" src={props.user.photo} />
            {editingKey === 'photo' ? (
              <>
                <input
                  onChange={(event) => setPhoto(event.currentTarget.value)}
                />
                <br />
                <button
                  className="editButtonStyles"
                  onClick={async () => {
                    await fetch(`/api/users/${props.user.id}`, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ user: { photo: photo } }),
                    });
                    setEditingKey(null);
                  }}
                >
                  save
                </button>{' '}
                <button
                  className="editButtonStyles"
                  onClick={() => {
                    setEditingKey(null);
                    setPhoto(props.user.photo);
                  }}
                >
                  cancel
                </button>
              </>
            ) : (
              <button
                className="editButtonStyles"
                onClick={() => {
                  setEditingKey('photo');
                }}
              >
                edit
              </button>
            )}
            <br />
            <br />
            <h3>{email}</h3>
            {editingKey === 'email' ? (
              <>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
                <button
                  className="editButtonStyles"
                  onClick={async () => {
                    await fetch(`/api/users/${props.user.id}`, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ user: { email: email } }),
                    });
                    setEditingKey(null);
                  }}
                >
                  save
                </button>{' '}
                <button
                  className="editButtonStyles"
                  onClick={() => {
                    setEditingKey(null);
                    setEmail(props.user.email);
                  }}
                >
                  cancel
                </button>
              </>
            ) : (
              <button
                className="editButtonStyles"
                onClick={() => {
                  setEditingKey('email');
                }}
              >
                edit
              </button>
            )}{' '}
            <br />
            <h3>{dateOfBirth}</h3>
            {editingKey === 'dateOfBirth' ? (
              <>
                <input
                  value={dateOfBirth.toString()}
                  onChange={(event) =>
                    setDateOfBirth(event.currentTarget.value)
                  }
                />
                <button
                  className="editButtonStyles"
                  onClick={async () => {
                    await fetch(`/api/users/${props.user.id}`, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        user: { dateOfBirth: dateOfBirth },
                      }),
                    });
                    setEditingKey(null);
                  }}
                >
                  save
                </button>{' '}
                <button
                  className="editButtonStyles"
                  onClick={() => {
                    setEditingKey(null);
                    setDateOfBirth(props.user.dateOfBirth);
                  }}
                >
                  cancel
                </button>
              </>
            ) : (
              <button
                className="editButtonStyles"
                onClick={() => {
                  setEditingKey('dateOfBirth');
                }}
              >
                edit
              </button>
            )}
            <br />
            <h3>{city}</h3>
            {editingKey === 'city' ? (
              <>
                <input
                  value={city}
                  onChange={(event) => setCity(event.currentTarget.value)}
                />
                <button
                  className="editButtonStyles"
                  onClick={async () => {
                    await fetch(`/api/users/${props.user.id}`, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ user: { city: city } }),
                    });
                    setEditingKey(null);
                  }}
                >
                  save
                </button>{' '}
                <button
                  className="editButtonStyles"
                  onClick={() => {
                    setEditingKey(null);
                    setCity(props.user.city);
                  }}
                >
                  cancel
                </button>
              </>
            ) : (
              <button
                className="editButtonStyles"
                onClick={() => {
                  setEditingKey('city');
                }}
              >
                edit
              </button>
            )}
            <br />
            <h3>Interests: {interests}</h3>
            {editingKey === 'interests' ? (
              <>
                <input
                  value={interests}
                  onChange={(event) => setInterests(event.currentTarget.value)}
                />
                <button
                  className="editButtonStyles"
                  onClick={async () => {
                    await fetch(`/api/users/${props.user.id}`, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        user: { interests: interests },
                      }),
                    });
                    setEditingKey(null);
                  }}
                >
                  save
                </button>{' '}
                <button
                  className="editButtonStyles"
                  onClick={() => {
                    setEditingKey(null);
                    setInterests(props.user.interests);
                  }}
                >
                  cancel
                </button>
              </>
            ) : (
              <button
                className="editButtonStyles"
                onClick={() => {
                  setEditingKey('interests');
                }}
              >
                edit
              </button>
            )}
            <br />
            <button
              className="buttonStyles"
              onClick={async () => {
                const answer = window.confirm(
                  `Really delete user ${props.user.lastName} ${props.user.lastName}?`,
                );
                if (answer === true) {
                  await fetch(`/api/users/${props.user.id}`, {
                    method: 'DELETE',
                  });

                  window.location.reload();
                }
              }}
            >
              delete user
            </button>
            <br />
            <div>
              <Link href="/logout">
                <a>Log out</a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUserBySessionToken, userToReactProps } = await import(
    '../utilities/database'
  );
  const { session: token } = nextCookies(context);

  const user = await getUserBySessionToken(token);
  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/profile',
        permanent: false,
      },
    };
  }

  const reactUser = userToReactProps(user);

  return { props: { user: reactUser } };
}
