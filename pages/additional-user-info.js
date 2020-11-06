import Head from 'next/head';
import Layout from '../components/Layout';
import { useState } from 'react';

export default function Products() {
  const [city, setCity] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');
  const [interests, setInterest] = useState('');
  return (
    <div>
      <Head>
        <title>Additional User Information</title>
      </Head>
      <Layout>
        <div className="registerContainer">
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
            <div className="createProfileContainer">
              <label for="date of Birth">
                <p>Date of Birth</p>
              </label>
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                name="date of Birth"
                required
              />
              <label for="My interests">
                <p>My Interests</p>
              </label>
              <input
                type="text"
                placeholder="Enter your interests"
                name="my interests"
                required
              />
              <br />
              <label for="City">
                <p>City</p>
              </label>
              <input
                type="text"
                placeholder="Enter City"
                name="city"
                required
              />
              <br />

              <button className="centeredButtonStyles" type="submit">
                Add to Profile
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}
