import { Fragment, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { User } from '../../utilities/types';
import { useRouter } from 'next/router';

type Props = {
  user: User;
};

export default function SingleUser(props: Props) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [firstName, setFirstName] = useState(props.user?.firstName);
  const [lastName, setLastName] = useState(props.user?.lastName);
  const [email, setEmail] = useState(props.user?.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(props.user?.dateOfBirth);
  const [city, setCity] = useState(props.user?.city);
  const [photo, setPhoto] = useState(props.user?.photo);
  const [interests, setInterests] = useState(props.user?.interests);

  //TO DO DATE FUNCTION

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
    <Layout>
      <Head>
        <title>Single User</title>
      </Head>
      <div className="formStyles">
        user id: {props.user.id}
        <br />
        <h2>user firstName</h2>
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
                  body: JSON.stringify({ user: { firstName: firstName } }),
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
                setFirstName(props.user.firstName);
              }}
            >
              cancel
            </button>
          </>
        )}
        <br />
        <h2>user lastName</h2>
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
              onClick={() => {
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
        <h2>Email</h2>
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
        <h2>Date of Birth</h2>
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
                  body: JSON.stringify({ user: { dateOfBirth: dateOfBirth } }),
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
        <h2>City</h2>
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
        <h2>Interests</h2>
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
            onClick={() => {
              setEditingKey('interests');
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
                  body: JSON.stringify({ user: { interests: interests } }),
                });
                setEditingKey(null);
              }}
            >
              save
            </button>{' '}
            <button
              onClick={() => {
                setEditingKey(null);
                setInterests(props.user.interests);
              }}
            >
              cancel
            </button>
            <br />
            <button
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
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query.id as string;

  // import { users } from '../utilities/database';
  const { getUserById, userToReactProps } = await import(
    '../../utilities/database'
  );
  const user = await getUserById(id);
  const reactUser = userToReactProps(user);

  const props: { user?: User } = {};
  if (user) props.user = reactUser;

  return {
    props: props,
  };
}
