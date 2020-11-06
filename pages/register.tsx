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

        <h2>Register</h2>
        <Link href="/">
          <a>
            <div className="LogoCenterStyles">
              <img
                className="lPLogoStyles"
                src="/hobbyMarketPlaceLogo.svg"
                alt="Logo"
              />
            </div>
          </a>
        </Link>
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
            const { success } = await response.json();

            if (success) {
              // Redirect to the homepage if successfully registered
              router.push('/profile');
            } else {
              // If the response status code (set using response.status()
              // in the API route) is 409 (Conflict) then show an error
              // message that the user already exists
              if (response.status === 409) {
                setErrorMessage('User already exists!');
              } else {
                setErrorMessage('Failed!');
              }
            }
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
        <p style={{ color: 'red' }}>{errorMessage}</p>

        {/* <Link href="/login">
            <a>Login</a>
          </Link> */}
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
