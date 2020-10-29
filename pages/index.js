import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div>
      <Head>
        <title>Landing page</title>
      </Head>
      <Layout>
        <div>
          <Link href="/">
            <a>
              <img
                className="lPLogoStyles"
                src="/hobbyMarketPlaceLogo.svg"
                alt="Logo"
              />
            </a>
          </Link>
        </div>
        <h1>
          Welcome to <br />
          hobby marketplace
        </h1>
        <button className="landingPageButtonStyles">Login</button>
        <button className="landingPageButtonStyles">Register</button>
      </Layout>
    </div>
  );
}
