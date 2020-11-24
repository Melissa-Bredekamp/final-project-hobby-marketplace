import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { isSessionTokenValid } from '../../utilities/auth';
import { Hobby } from '../../utilities/types';

type Props = {
  hobbies: Hobby;
  // users: User;
};

export default function hobby(props: { hobbies: Hobby }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Hobby</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <main>
          <div className="hobbyStyles">
            <h2>{props.hobbies.hobbyOffer}</h2>
            <div className="newsfeedFlexStyles">
              <span>image</span>
              <div>
                <p>{`${props.hobbies.hostFirstName} ${props.hobbies.hostLastName}`}</p>

                <p>{props.hobbies.city}</p>

                <p>{props.hobbies.availability}</p>
              </div>
            </div>
            <div className="hobbyTextStyles">
              <p>{props.hobbies.aboutMe}</p>
            </div>
            <div className="footerStyles">
              <button
                onClick={() => router.push('/email')}
                className="centeredButtonStyles"
              >
                Email me
              </button>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);

  if (!(await isSessionTokenValid(token))) {
    return {
      redirect: {
        destination: '/login?returnTo=/profile',
        permanent: false,
      },
    };
  }

  const id = context.query.id as string;
  const { getHobbyById } = await import('../../utilities/database');
  const hobbies = await getHobbyById(id);

  return {
    props: {
      hobbies,
    },
  };
}
