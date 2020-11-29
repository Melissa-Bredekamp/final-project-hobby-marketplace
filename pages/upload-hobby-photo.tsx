import { GetServerSidePropsContext } from 'next';
import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { User } from '../utilities/types';
import { isSessionTokenValid } from '../utilities/auth';

type Props = {
  user: User;
  loggedIn: boolean;
  redirectDestination: string;
};

export default function hobbyUpload(props: Props) {
  const [hobbyPhoto, setHobbyPhoto] = useState<string | null>();
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
          setHobbyPhoto(reader.result as string);
          // preview.src = reader.result;
        },
        false,
      );
    }
  };

  return (
    <div>
      <Head>
        <title>Upload Hobby Pic</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <form className="uploadPhotStyles">
          <div>
            <h1>Pimp your Hobby</h1>
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
                  console.log(hobbyPhoto);
                  await fetch(`/api/photo-uploader`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      user: { photoFile: hobbyPhoto },
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
  const { getHobbyBySessionToken } = await import('../utilities/database');

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
  return { props: { hobbies } };
}
