import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { isSessionTokenValid } from '../../utilities/auth';
import { Hobby } from '../../utilities/types';

type Props = {
  hobbies: Hobby;
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
          <div className="formStyles">
            <h2>{props.hobbies.hobbyOffer}</h2>
            <div className="newsfeedFlexStyles">
              <span>image</span>
              <img
                className="hobbyImageStyles"
                src={props.hobbies.hobbyPhoto}
              />
              <div>
                <p>{`${props.hobbies.hostFirstName} ${props.hobbies.hostLastName}`}</p>

                <p>{props.hobbies.city}</p>

                <p>{props.hobbies.availability}</p>
              </div>
            </div>
            <div className="hobbyTextStyles">
              <p>{props.hobbies.aboutMe}</p>
            </div>
            <div>
              <button
                onClick={async (e) => router.push('/inbox')}
                className="contactButtonStyles"
                type="submit"
              >
                Contact me
              </button>
              <br />
              {/* <button
                className="buttonStyles"
                onClick={async () => {
                  const answer = window.confirm(
                    `Really delete user ${props.hobbies.hobbyOffer}?`,
                  );
                  if (answer === true) {
                    await fetch(`/api/users/${props.hobbies.hobbyId}`, {
                      method: 'DELETE',
                    });

                    window.location.reload();
                  }
                }}
              >
                Delete hobby
              </button> */}
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
