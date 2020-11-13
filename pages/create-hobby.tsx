import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import nextCookies from 'next-cookies';
import Head from 'next/head';
import Layout from '../components/Layout';
import { Hobby } from '../utilities/types';
import { isSessionTokenValid } from '../utilities/auth';
import { getUserBySessionToken } from '../utilities/database';

type Props = {
  hobbies: Hobby;
};

export default function NewHobby(props: Props) {
  const [hobbyOffer, setHobbyOffer] = useState('');
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
                    hobbyoffer: hobbyOffer,
                    availability: availability,
                    city: city,
                    aboutMe: aboutMe,
                  },
                }),
              });
              const newHobby = (await response.json()).hobby;
              window.location.href = `/users/${newHobby.id}`;
            }}
          >
            <label>
              <p>hobby</p>
              <input
                data-cy="new-hobby-hobby-offer-input"
                type="text"
                placeholder="Enter hobby description"
                name="HobbyOffer"
                value={hobbyOffer}
                onChange={(event) => setHobbyOffer(event.currentTarget.value)}
              />
            </label>
            <br />
            <label>
              <p>city</p>
              <input
                data-cy="new-hobby-city-input"
                type="text"
                placeholder="Enter city"
                name="city"
                value={city}
                onChange={(event) => setCity(event.currentTarget.value)}
              />
            </label>
            <br />
            <label>
              <p>availability</p>
              <input
                data-cy="new-hobby-availability-input"
                type="text"
                placeholder="Enter Days, times"
                name="availability"
                value={availability}
                onChange={(event) => setAvailability(event.currentTarget.value)}
              />
            </label>
            <br />
            <label>
              <p>aboutMe</p>
              <input
                data-cy="new-hobby-about-me-input"
                type="text"
                placeholder="Tell us something about yourself"
                name="aboutMe"
                value={aboutMe}
                onChange={(event) => setAboutMe(event.currentTarget.value)}
              />
            </label>
            <br />
            <div className="footerStyles">
              <button className="centeredButtonStyles">Publish Hobby</button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  if (!isSessionTokenValid(token))
    return {
      redirect: {
        destination: '/users/create-users',
        permanent: false,
      },
    };
  const hobbies = await getUserBySessionToken(token);

  return { props: { hobbies } };
}
