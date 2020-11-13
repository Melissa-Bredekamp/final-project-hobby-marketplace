import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { isSessionTokenValid } from '../utilities/auth';
import Layout from '../components/Layout';

type Props = { loggedIn: boolean; redirectDestination: string };

export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <Layout loggedIn={props.loggedIn}>
        <h2>Login</h2>
        <form
          className="formStyles"
          onSubmit={async (e) => {
            e.preventDefault();

            const response = await fetch('/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
            });

            const { success } = await response.json();

            if (!success) {
              setErrorMessage('Login failed!');
            } else {
              setErrorMessage('');
              router.push(props.redirectDestination);
            }
          }}
        >
          <div>
            <div className="LogoCenterStyles">
              <Link href="/">
                <a>
                  <img
                    className="lPLogoStyles"
                    src="/hobbyMarketPlaceLogo.svg"
                    alt="Logo"
                  />
                </a>
              </Link>
            </div>
            <div className="loginContainer">
              <label htmlFor="uname">
                <p>Username</p>
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                type="text"
                placeholder="Enter Username"
                name="username"
                required
              />
              <label htmlFor="password">
                <p>Password</p>
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                type="password"
                placeholder="Enter Password"
                name="password"
                required
              />
              <br />

              <button className="buttonStyles" type="submit">
                Log in
              </button>
            </div>
          </div>
        </form>
        <p style={{ color: 'red' }}>{errorMessage}</p>

        {/* <Link href="/register">
        <a>Register</a>
      </Link> */}
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);

  const redirectDestination = '/users/create-users';

  if (await isSessionTokenValid(token)) {
    return {
      redirect: {
        destination: redirectDestination,
        permanent: false,
      },
    };
  }

  return {
    props: { loggedIn: false, redirectDestination: redirectDestination },
  };
}
