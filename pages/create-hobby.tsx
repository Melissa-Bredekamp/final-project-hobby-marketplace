import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import nextCookies from 'next-cookies';
import Head from 'next/head';
import Layout from '../components/Layout';
import { Hobby } from '../utilities/types';
import { isSessionTokenValid } from '../utilities/auth';
import { getHobbyBySessionToken } from '../utilities/database';

type Props = {
  hobbies: Hobby;
};

export default function NewHobby(props: Props) {
  const [hobbyOffer, setHobbyOffer] = useState('');
  const [city, setCity] = useState('');
  const [availability, setAvailability] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Create hobby</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <div className="pageStyles">
          <h1>Your hobby offer</h1>
          <form
            className="formStyles"
            onSubmit={async (event) => {
              event.preventDefault();
              const response = await fetch('/api/hobby', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  // hobbies: {
                  id: props.hobbies.hobbyId,
                  hobbyOffer: hobbyOffer,
                  availability: availability,
                  city: city,
                  aboutMe: aboutMe,
                  // },
                }),
              });
              const jsonResponse = await response.json();
              // console.log('jsonResponse', jsonResponse);
              const newHobby = jsonResponse.hobbies;
              // console.log(newHobby);
              window.location.href = `/hobby/${newHobby.hobbyId}`;
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
                onChange={(event) =>
                  setHobbyOffer(event.currentTarget.value.toUpperCase())
                }
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
              <button
                onClick={() => router.push('/upload-hobby-photo')}
                data-cy="new-user-hobby-button"
                className="centeredButtonStyles"
                type="submit"
              >
                Publish Hobby
              </button>
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
        destination: '/create-hobby',
        permanent: false,
      },
    };
  const hobbies = await JSON.parse(
    JSON.stringify(getHobbyBySessionToken(token)),
  );
  // console.log(hobbies);
  return { props: { hobbies } };
}
