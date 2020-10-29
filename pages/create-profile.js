import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Products() {
  return (
    <div>
      <Head>
        <title>Create Profile</title>
      </Head>
      <Layout>
        <form className="formStyles">
          <div className="createProfileContainer">
            <Link
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
            </Link>

            <label for="date of Birth">
              <p>Date of Birth</p>
            </label>
            <input
              type="text"
              placeholder="DD/MM/YYYY"
              name="date of Birth"
              required
            />
            <label for="City">
              <p>City</p>
            </label>
            <input type="text" placeholder="Enter City" name="city" required />
            <br />
            <button className="buttonStyles" type="submit">
              Create Profile
            </button>
          </div>
        </form>
      </Layout>
    </div>
  );
}
