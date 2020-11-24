import Head from 'next/head';
import Layout from '../components/Layout';

export default function email() {
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
                <div className="footerStyles">
                  <button className="centeredButtonStyles">Send</button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}
