import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import nextCookies from 'next-cookies';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { User } from '../../utilities/types';
import { isSessionTokenValid } from '../../utilities/auth';
import {
  getUserBySessionToken,
  userToReactProps,
} from '../../utilities/database';

type Props = {
  user: User;
  loggedIn: boolean;
  redirectDestination: string;
};

export default function newUser(props: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');
  const router = useRouter();

  // console.log(props);
  // if (props.user === user.id)
  return (
    <div>
      <Head>
        <title>Create User</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <div className="pageStyles">
          <h1>Your Profile</h1>
          <form
            className="formStyles"
            onSubmit={async (event) => {
              event.preventDefault();
              const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  user: {
                    id: props.user.id,
                    firstName: firstName,
                    lastName: lastName,
                    dateOfBirth: dateOfBirth,
                  },
                }),
              });
              const jsonResponse = await response.json();
              // console.log('response:', jsonResponse);
              const newUser = jsonResponse.user;
              window.location.href = `/users/${newUser.id}`;
            }}
          >
            <label>
              <p>First name: </p>
              <input
                data-cy="new-user-first-name-input"
                type="text"
                placeholder="first name"
                name="firstName"
                required
                value={firstName}
                onChange={(event) => setFirstName(event.currentTarget.value)}
              />
            </label>
            <br />
            <label>
              <p>Last name: </p>
              <input
                data-cy="new-user-last-name-input"
                type="text"
                placeholder="Last name"
                name="lastName"
                required
                value={lastName}
                onChange={(event) => setLastName(event.currentTarget.value)}
              />
            </label>
            <br />
            <label>
              <p>Date of Birth: </p>

              <input
                data-cy="new-user-date-of-birth-input"
                type="text"
                placeholder="YYYY.MM.DD"
                name="dateOfBirth"
                required
                value={dateOfBirth}
                onChange={(event) => setdateOfBirth(event.currentTarget.value)}
              />
            </label>
            <br />
            <div className="footerStyles">
              {/* <Link href="/additional-user-info"> */}
              <button
                onClick={() => router.push('/additional-user-info')}
                data-cy="new-user-form-button"
                className="centeredButtonStyles"
              >
                Create profile
              </button>
              {/* </Link> */}
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);

  const redirectDestination = '/additional-user-info';

  if (!isSessionTokenValid(token))
    return {
      redirect: {
        destination: '/users/create-users',
        permanent: false,
      },
    };
  const user = await getUserBySessionToken(token);
  const reactUser = userToReactProps(user);

  return { props: { user: reactUser } };
}
