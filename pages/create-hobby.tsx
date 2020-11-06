import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { User } from '../utilities/types';

type Props = {
  user: User;
};

export default function NewUser(props: Props) {
  const [hobby, setHobby] = useState('');
  const [city, setCity] = useState('');
  const [availability, setAvailability] = useState('');
  const [aboutMe, setAboutMe] = useState('');

  return (
    <div>
      <Head>
        <title>Create hobby</title>
      </Head>
      <Layout>
        <div className="pageStyles">
          <h1>Offer a hobby</h1>
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
                    hobby: hobby,
                    city: city,
                    availability: availability,
                    aboutMe: aboutMe,
                  },
                }),
              });
              const newUser = (await response.json()).user;
              window.location.href = `/users/${newUser.id}`;
            }}
          >
            <label>
              <p>hobby</p>
              <input
                value={hobby}
                onChange={(event) => setHobby(event.currentTarget.value)}
              />
            </label>
            <br />
            <label>
              <p>city</p>
              <input
                value={city}
                onChange={(event) => setCity(event.currentTarget.value)}
              />
            </label>
            <br />
            <label>
              <p>availability</p>
              <input
                value={availability}
                onChange={(event) => setAvailability(event.currentTarget.value)}
              />
            </label>
            <br />
            <label>
              <p>aboutMe</p>
              <input
                value={aboutMe}
                onChange={(event) => setAboutMe(event.currentTarget.value)}
              />
            </label>
            <br />

            <button className="centeredButtonStyles">Publish Hobby</button>
          </form>
        </div>
      </Layout>
    </div>
  );
}
