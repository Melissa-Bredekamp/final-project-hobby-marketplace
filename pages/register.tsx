import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Register(props: { token: string }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <>
      <div>
        <Head>
          <title>Register</title>
        </Head>
        <Layout>
          <h2>Register</h2>
          <form
            className="formStyles"
            onSubmit={async (e) => {
              // Prevent the default browser behavior of forms
              e.preventDefault();

              // Send the username, password and token to the
              // API route
              const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                  token: props.token,
                }),
              });
            }}
          >
            <div className="registerContainer">
              <label htmlFor="username">
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
              <label htmlFor="passwordw">
                <p>Password</p>
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                type="password"
                placeholder="Enter Password"
                name="psasword"
                required
              />
              <br />
              <button className="buttonStyles" type="submit">
                Register
              </button>
            </div>
          </form>
        </Layout>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const tokens = new (await import('csrf')).default();
  const secret = process.env.CSRF_TOKEN_SECRET;
  if (typeof secret === 'undefined') {
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured');
  }
  const token = tokens.create(secret);
  return { props: { token } };
}
