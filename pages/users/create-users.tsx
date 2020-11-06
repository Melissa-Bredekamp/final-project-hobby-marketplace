import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { User } from '../../utilities/types';

type Props = {
  user: User;
};

export default function NewUser(props: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div>
      <Head>
        <title>New User</title>
      </Head>
      <Layout>
        <div>
          <h1>Your Profile</h1>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  user: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                  },
                }),
              });
              const newUser = (await response.json()).user;
              window.location.href = `/users/${newUser.id}`;
            }}
          >
            <label>
              firstName
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.currentTarget.value)}
              />
            </label>
            <label>
              lastName
              <input
                value={lastName}
                onChange={(event) => setLastName(event.currentTarget.value)}
              />
            </label>
            <label>
              Email
              <input
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </label>

            <button className="centeredButtonStyles">Create profile</button>
          </form>
        </div>
      </Layout>
    </div>
  );
}
