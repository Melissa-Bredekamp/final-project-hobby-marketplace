import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import { isSessionTokenValid } from '../utilities/auth';

export default function newsfeed(props) {
  console.log(props.hobbies, 'props.hobbies');

  return (
    <div>
      <Head>
        <title>Newsfeed</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <main>
          <div className="newsfeedStyles">
            {props.hobbies.map((hobby) => {
              // console.log(hobby.hobbyOffer.toUpperCase());
              return (
                <div key={hobby.id}>
                  <h4>{hobby.hobbyOffer}</h4>

                  <div className="newsfeedFlexStyles">
                    <span>image</span>
                    <div>
                      <p>{`${hobby.hostFirstName} ${hobby.hostLastName}`} </p>
                      <br />
                      <p>{hobby.city}</p>
                      <br />
                      <p>{hobby.availability}</p>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: 10,
                      marginHorizontal: 10,
                      backgroundColor: '#f9f1f1',
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);

  if (!(await isSessionTokenValid(token))) {
    return {
      redirect: {
        destination: '/login?returnTo=/profile',
        permanent: false,
      },
    };
  }

  const { getNewsfeedHobbyById } = await import('../utilities/database');
  const hobbies = await getNewsfeedHobbyById();

  return {
    props: {
      hobbies,
    },
  };
}
