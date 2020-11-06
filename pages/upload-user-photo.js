import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import ProfilePicUpLoader from '../components/ProfilePicUpLoader';

export default function Products() {
  return (
    <div>
      <Head>
        <title>Create Profile</title>
      </Head>
      <Layout>
        <form className="formStyles">
          <div className="createProfileContainer">
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
            <ProfilePicUpLoader />

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
            <button className="buttonStyles" type="submit">
              Add to Profile
            </button>
            {/* </a>
            </Link> */}
          </div>
        </form>
      </Layout>
    </div>
  );
}
