import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function upload() {
  const [photo, setPhoto] = useState();

  const handleChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <div>
      <Head>
        <title>Upload Profile Pic</title>
      </Head>
      <Layout>
        <form className="formStyles">
          <div className="createProfileContainer">
            <input className="uploaderStyles"
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

            <label htmlFor="first name">
              <p>First name</p>
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              name="first name"
              required
            />
            <label htmlFor="last name">
              <p>Last name</p>
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              name="last name"
              required
            />
            <br />
            {/* <Link href="/profile">
              <a> */}
            <div>
              <button
                className="buttonStyles"
                type="submit"
                disable={!photo}
                onClick={async () => {
                  await fetch(`/api/users/${props.user.id}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      user: { photo: photo },
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
