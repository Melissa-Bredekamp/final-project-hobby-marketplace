import Head from 'next/head';
import Layout from '../components/Layout';

export default function newsfeed() {
  return (
    <div>
      <Head>
        <title>Newsfeed</title>
      </Head>
      <Layout>
        <main>
          <div className="newsfeedStyles">
            <h4>YOGA</h4>
            <div className="newsfeedFlexStyles">
              <span>image</span>
              <div>
                <p>Tina Teacher</p>
                <br />
                <p>Vienna</p>
                <br />
                <p>Afternoons</p>
                <br />
                <p>17:00 - 20:00</p>
              </div>
            </div>
          </div>
          <div className="newsfeedStyles">
            <h4>PHOTOGRAPHY</h4>
            <div className="newsfeedFlexStyles">
              <span>image</span>
              <div>
                <p>Oliie Offer</p>
                <br />
                <p>Salzburg</p>
                <br />
                <p>Weekends</p>
                <br />
                <p>09:00 - 18:00</p>
              </div>
            </div>
          </div>
          <div className="newsfeedStyles">
            <h4>GAMING</h4>
            <div className="newsfeedFlexStyles">
              <span>image</span>
              <div>
                <p>Thomas Tutor</p>
                <br />
                <p>Graz</p>
                <br />
                <p>daily</p>
                <br />
                <p>16:00 - 02:00</p>
              </div>
            </div>
          </div>
          <div className="newsfeedStyles">
            <h4>CODING</h4>
            <div className="newsfeedFlexStyles">
              <span>image</span>
              <div>
                <p>Karl Horky</p>
                <br />
                <p>Vienna</p>
                <br />
                <p>daily</p>
                <br />
                <p>09:00 - 18:00</p>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}
