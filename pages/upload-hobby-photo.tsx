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
        <title>Upload Profile Pic</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <form className="uploadPhotStyles">
          <div className="createProfileContainer">
            <h1>Upload Hobby Photo</h1>
            <input
              className="uploaderStyles"
              onChange={handleChange}
              accept=".png, .jpeg, .jpg"
              type="file"
            ></input>
            {/* <Link
              className="placeholderStyles"
              href="//fonts.googleapis.com/css?family=Roboto:500,300,700,400italic,400"
            >
              <a>
                <div class="profilePicContainer">
                  <div class="pic">PIC</div>
                  <br />
                  <div class="name"> Username </div>
                </div>
              </a>
            </Link> */}
            {/* <ProfilePicUpLoader /> */}

            <br />
            {/* <Link href="/profile">
              <a> */}
            <div>
              <button
                className="buttonStyles"
                type="submit"
                // disable={!hobbyPhoto}
                onClick={async () => {
                  console.log(hobbyPhoto);
                  await fetch(`/api/users/${props.user.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      user: { hobbyPhoto: hobbyPhoto },
                    }),
                  });
                }}
              >
                Add to Profile
              </button>
            </div>
            {/* </a>
            </Link> */}
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
  if (!user){
    return {
      redirect: {
        destination: '/users/create-users',
        permanent: false,
      },
    };
  }
  const reactUser = userToReactProps(user);

  return { props: { user: reactUser } };
}
