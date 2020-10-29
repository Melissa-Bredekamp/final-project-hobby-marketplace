import Head from 'next/head';
import Layout from '../components/Layout';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <Layout>
        <h2>Log in</h2>
        <form
          className="formStyles"
          onSubmit={(e) => {
            e.preventDefault();
            fetch('/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
            });
          }}
        >
          <div className="loginContainer">
            <label for="uname">
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
            <label for="psw">
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

            {/* <label>
              <input /type="checkbox" checked="checked" name="remember" />{' '}
              Remember me
            </label> */}
            <button className="buttonStyles" type="submit">
              Log in
            </button>
          </div>
        </form>
      </Layout>
    </div>
  );
}
