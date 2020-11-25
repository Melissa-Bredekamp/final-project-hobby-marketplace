import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import nextCookies from 'next-cookies';
import Head from 'next/head';
import Layout from '../components/Layout';
import { User } from '../utilities/types';
import { isSessionTokenValid } from '../utilities/auth';

type Props = {
  user: User;
  loggedIn: boolean;
  redirectDestination: string;
};

export default function AdditionalUserInfo(props: Props) {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [interests, setInterests] = useState('');
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Additional User Information</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <div className="pageStyles">
          <h1>You're almost there!</h1>
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
                    email: email,
                    city: city,
                    interests: interests,
                  },
                }),
              });
              const jsonResponse = await response.json();
              const newUser = jsonResponse.user;
              window.location.href = `/users/${newUser.id}`;
            }}
          >
            <div className="createProfileContainer">
              <label htmlFor="email">
                <p>Email</p>
              </label>
              <input
                data-cy="new-user-email-input"
                type="text"
                placeholder="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
              <br />
              <label htmlFor="City">
                <p>City</p>
              </label>
              <input
                data-cy="new-user-city-input"
                type="text"
                placeholder="Enter City"
                name="city"
                required
                value={city}
                onChange={(event) => setCity(event.currentTarget.value)}
              />
              <br />
              <label htmlFor="My interests">
                <p>My Interests</p>
              </label>
              <input
                data-cy="new-user-interests-input"
                type="text"
                placeholder="Enter your interests"
                name="myInterests"
                value={interests}
                onChange={(event) => setInterests(event.currentTarget.value)}
              />
              <br />

              <button
                onClick={() => router.push('/upload-user-photo')}
                data-cy="new-user-form-button"
                className="centeredButtonStyles"
                type="submit"
              >
                Add to Profile
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
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
        destination: '/additional-user-info',
        permanent: false,
      },
    };
  }
  const reactUser = userToReactProps(user);

  return { props: { user: reactUser } };
}
