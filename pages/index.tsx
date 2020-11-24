import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../utilities/auth';

type Props = { loggedIn: boolean };

export default function LandingPage(props: Props) {
  const loggedInPassed = typeof props.loggedIn !== 'undefined';
  return (
    <div>
      <Head>
        <title>Landing page</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div loggedIn={props.loggedIn}>
        <div className="LandingPageStyles">
          <div className="LogoCenterStyles">
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
          <Link href="/register">
            <a>
              <button
                data-cy="go-to-register"
                className="landingPageButtonStyles"
              >
                Register
              </button>
            </a>
          </Link>
          <Link href="/login">
            <a>
              <button data-cy="go-to-login" className="landingPageButtonStyles">
                Login
              </button>
            </a>
          </Link>
          <br />{' '}
          <div>
            <Link href="/logout">
              <a>Log out</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  return { props: { loggedIn } };
}
