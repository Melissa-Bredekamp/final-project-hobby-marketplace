import nextCookies from 'next-cookies';
import Head from 'next/head';
import Layout from '../components/Layout';
import { isSessionTokenValid } from '../utilities/auth';
import Link from 'next/link';

export default function newsfeed(props) {
  return (
    <div>
      <Head>
        <title>Newsfeed</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <main>
          <div className="newsfeedFormStyles">
            {props.hobbies.map((hobby) => (
              <Link href={`/hobby/${hobby.hobbyId}`}>
                <div className="newsfeedStyles" key={hobby.hobbyId}>
                  <h4> {hobby.hobbyOffer}</h4> 
                  <div className="newsfeedFlexStyles">
                    <span>
                      <img src={hobby.hobbyPhoto} />
                    </span>
                    <div>
                      <p>{`${hobby.hostFirstName} ${hobby.hostLastName}`} </p>
                      <br />
                      <p>{hobby.city}</p>
                      <br />
                      <p>{hobby.availability}</p>
                    </div>
                  </div>
                  <div></div>
                </div>
              </Link>
            ))}
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
