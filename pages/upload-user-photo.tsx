import { GetServerSidePropsContext } from 'next';
import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { User } from '../utilities/types';

type Props = {
  user: User;
  loggedIn: boolean;
  redirectDestination: string;
};

export default function upload(props: Props) {
  const [photo, setPhoto] = useState<string | null>();
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(JSON.stringify(event.target.files, null, 2));
    console.log(event.target.files?.[0]);
    const file = event.target.files?.[0];
    const reader = new FileReader();

    if (file) {
      // Convert file blob to base64 DataURI(URL)
      reader.readAsDataURL(file);
      reader.addEventListener(
        'load',
        function () {
          console.log('load', reader.result);
          // convert image file to base64 string
          setPhoto(reader.result as string);
          // preview.src = reader.result;
        },
        false,
      );
    }
  };

  return (
    <div>
      <Head>
        <title>Upload Profile Pic</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <form className="uploadPhotStyles">
          <div>
            <h1>Complete your Profile</h1>
            <input
              className="uploaderStyles"
              onChange={handleChange}
              accept=".png, .jpeg, .jpg"
              type="file"
            ></input>

            <br />

            <div>
              <button
                className="buttonStyles"
                type="submit"
                onClick={async () => {
                  console.log(photo);
                  await fetch(`/api/users/${props.user.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      user: { photoFile: photo },
                    }),
                  });
                }}
              >
                Add to Profile
              </button>
            </div>
          </div>
        </form>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUserBySessionToken, userToReactProps } = await import(
    '../utilities/database'
  );
  const { session: token } = nextCookies(context);

  const redirectDestination = '/additional-user-info';

  const user = await getUserBySessionToken(token);
  if (!user)
    return {
      redirect: {
        destination: '/users/create-users',
        permanent: false,
      },
    };
  const reactUser = userToReactProps(user);

  return { props: { user: reactUser } };
}
