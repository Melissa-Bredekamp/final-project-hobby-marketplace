import nextCookies from 'next-cookies';
import Head from 'next/head';
import Layout from '../components/Layout';
import { isSessionTokenValid } from '../utilities/auth';

export default function inbox(props) {
  console.log(props.messages, 'props.messages');
  console.log(props);

  return (
    <div>
      <Head>
        <title>Inbox</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <main>
          <div className="messagesStyles">
            {props.messages.map((message) => (
              <div key={props.messageId}>
                <h4>
                  From{' '}
                  {`${message.senderId.hostFirstName} ${message.senderId.hostLastName}`}
                </h4>
                <div className="newsfeedFlexStyles">
                  <span>image</span>
                  <div>
                    <p>{message.sentDate} </p>
                    <br />
                    <p>{message.subject}</p>
                    <br />
                    <p>{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);

  if (!(await isSessionTokenValid(token))) {
    return {
      redirect: {
        destination: '/login?returnTo=/profile',
        permanent: false,
      },
    };
  }

  const { getMessages } = await import('../utilities/database');

  const messages = await getMessages();

  return {
    props: {
      messages: messages,
    },
  };
}
