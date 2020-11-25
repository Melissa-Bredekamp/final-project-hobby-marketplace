import Head from 'next/head';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

export default function email() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Email</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <main>
          <div>
            <div>
              <form className="formStyles">
                <div>
                  <textarea
                    className="emailInputStyles"
                    name="message"
                    placeholder="Start typing your message..."
                    rows="25"
                    cols="30"
                  ></textarea>
                </div>
                <div>
                  <button
                    onClick={() => router.push('/inbox')}
                    className="centeredButtonStyles"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}
