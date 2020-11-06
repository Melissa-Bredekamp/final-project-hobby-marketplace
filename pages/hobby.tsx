import Head from 'next/head';
import Layout from '../components/Layout';

export default function hobby() {
  return (
    <div>
      <Head>
        <title>Hobby</title>
      </Head>
      <Layout>
        <main>
          <div className="hobbyStyles">
            <h2>YOGA</h2>
            <div className="newsfeedFlexStyles">
              <span>image</span>
              <div>
                <p>Tina Teacher</p>

                <p>Vienna</p>

                <p>Afternoons</p>

                <p>17:00 - 20:00</p>
              </div>
            </div>
            <div className="hobbyTextStyles">
              <p>
                My name is Tina Teacher and I<p>something</p>
                am 28 years old. I just completed my 2 year yogi training in
                Bali and would like to one day be a yoga instructor here in
              </p>
              {/* <p>
                Vienna. To get some experience I would like to do some informal
                yoga sessions outside of a studio. Contact me if you would like
                to join
              </p> */}
            </div>
            <div className="footerStyles">
              <button className="centeredButtonStyles">Email me</button>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}
