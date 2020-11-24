import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { isSessionTokenValid } from '../utilities/auth';
import Layout from '../components/Layout';
import { User } from '../utilities/types';

export default function Profile(props: { user: User; loggedIn: boolean }) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [firstName, setFirstName] = useState(props.user?.firstName);
  const [lastName, setLastName] = useState(props.user?.lastName);
  const [email, setEmail] = useState(props.user?.email);
  const [dateOfBirth, setDateOfBirth] = useState(props.user?.dateOfBirth);
  const [city, setCity] = useState(props.user?.city);
  const [photo, setPhoto] = useState(props.user?.photo);
  const [interests, setInterests] = useState(props.user?.interests);

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
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      <Layout>
        <div className="profileTextStyles">
          <div className="pageStyles">
            user id: {props.user.id}
            <br />
            <h2>First name: {firstName}</h2>
            {editingKey === 'firstName' ? (
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.currentTarget.value)}
              />
            ) : (
              firstName
            )}{' '}
            {editingKey !== 'firstName' ? (
              <button
                className="buttonStyles"
                onClick={() => {
                  setEditingKey('firstName');
                }}
              >
                edit
              </button>
            ) : (
              <>
                <button
                  className="buttonStyles"
                  onClick={async () => {
                    await fetch(`/api/users/${props.user.id}`, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        user: { firstName: firstName },
                      }),
                    });
                    setEditingKey(null);
                  }}
                >
                  save
                </button>{' '}
                <button
                  className="buttonStyles"
                  onClick={() => {
                    setEditingKey(null);
                    setFirstName(props.user.firstName);
                  }}
                >
                  cancel
                </button>
              </>
            )}
            <br />
            <h2>Last name: {lastName}</h2>
            {editingKey === 'lastName' ? (
              <input
                value={lastName}
                onChange={(event) => setLastName(event.currentTarget.value)}
              />
            ) : (
              lastName
            )}{' '}
            {editingKey !== 'lastName' ? (
              <button
                className="buttonStyles"
                onClick={() => {
                  setEditingKey('lastName');
                }}
              >
                edit
              </button>
            ) : (
              <>
                <button
                  className="buttonStyles"
                  onClick={async () => {
                    await fetch(`/api/users/${props.user.id}`, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        user: { lastName: lastName },
                      }),
                    });
                    setEditingKey(null);
                  }}
                >
                  save
                </button>{' '}
                <button
                  className="buttonStyles"
                  onClick={() => {
                    setEditingKey(null);
                    setLastName(props.user.lastName);
                  }}
                >
                  cancel
                </button>
              </>
            )}
            <h2>Email: {email}</h2>
            {editingKey === 'email' ? (
              <input
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            ) : (
              email
            )}{' '}
            {editingKey !== 'email' ? (
              <button
                className="buttonStyles"
                onClick={() => {
                  setEditingKey('email');
                }}
              >
                edit
              </button>
            ) : (
              <>
                <button
                  className="buttonStyles"
                  onClick={async () => {
                    await fetch(`/api/users/${props.user.id}`, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ user: { email: email } }),
                    });
                    setEditingKey(null);
                    // TODO: Save to server
                  }}
                >
                  save
                </button>{' '}
                <button
                  className="buttonStyles"
                  onClick={() => {
                    setEditingKey(null);
                    setEmail(props.user.email);
                  }}
                >
                  cancel
                </button>
              </>
            )}
            <br />
            <h2>Date of Birth: {dateOfBirth}</h2>
            {editingKey === 'dateOfBirth' ? (
              <input
                value={dateOfBirth}
                onChange={(event) => setDateOfBirth(event.currentTarget.value)}
              />
            ) : (
              dateOfBirth
            )}{' '}
            {editingKey !== 'dateOfBirth' ? (
              <button
                className="buttonStyles"
                onClick={() => {
                  setEditingKey('dateOfBirth');
                }}
              >
                edit
              </button>
            ) : (
              <>
                <button
                  className="buttonStyles"
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
                  className="buttonStyles"
                  onClick={() => {
                    setEditingKey(null);
                    setDateOfBirth(props.user.dateOfBirth);
                  }}
                >
                  cancel
                </button>
              </>
            )}
            <br />
            <h2>City: {city}</h2>
            {editingKey === 'city' ? (
              <input
                value={city}
                onChange={(event) => setCity(event.currentTarget.value)}
              />
            ) : (
              city
            )}{' '}
            {editingKey !== 'city' ? (
              <button
                className="buttonStyles"
                onClick={() => {
                  setEditingKey('city');
                }}
              >
                edit
              </button>
            ) : (
              <>
                <button
                  className="buttonStyles"
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
                  className="buttonStyles"
                  onClick={() => {
                    setEditingKey(null);
                    setCity(props.user.city);
                  }}
                >
                  cancel
                </button>
              </>
            )}
            {/* <br />
    <h2>Photo</h2>
    {editingKey === 'photo' ? (
      <input
        value={photo}
        onChange={(event) => setPhoto(event.currentTarget.value)}
      />
    ) : (
      photo
    )}{' '}
    {editingKey !== 'photo' ? (
      <button
        onClick={() => {
          setEditingKey('photo');
        }}
      >
        edit
      </button>
    ) : (
      <>
        <button
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
          onClick={() => {
            setEditingKey(null);
            setPhoto(props.user.photo);
          }}
        >
          cancel
        </button>
      </>
    )} */}
            <br />
            <h2>Interests: {interests}</h2>
            {editingKey === 'interests' ? (
              <input
                value={interests}
                onChange={(event) => setInterests(event.currentTarget.value)}
              />
            ) : (
              interests
            )}{' '}
            {editingKey !== 'interests' ? (
              <button
                className="buttonStyles"
                onClick={() => {
                  setEditingKey('interests');
                }}
              >
                edit
              </button>
            ) : (
              <>
                <button
                  className="buttonStyles"
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
                  className="buttonStyles"
                  onClick={() => {
                    setEditingKey(null);
                    setInterests(props.user.interests);
                  }}
                >
                  cancel
                </button>
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
              </>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUserBySessionToken, userToReactProps } = await import ('../utilities/database');
  const { session: token } = nextCookies(context);

  if (!(await isSessionTokenValid(token))) {
    return {
      redirect: {
        destination: '/login?returnTo=/profile',
        permanent: false,
      },
    };
  }

  // TODO: Actually, you could do this with one query
  // instead of two like done here
  const user = await getUserBySessionToken(token);

  const reactUser = userToReactProps(user);

  return { props: { user: reactUser } };
}
