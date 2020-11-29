import nextCookies from 'next-cookies';
import { useState } from 'react';
import Head from 'next/head';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';

import { isSessionTokenValid } from '../../../utilities/auth';

export default function email(props) {
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
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
              <form className="FormStyles">
                onSubmit=
                {async (event) => {
                  event.preventDefault();
                  const response = await fetch('/api/inbox', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      id: props.hobbies.hobbyId,
                      messageId: messageId,
                      subject: subject,
                      text: text,
                    }),
                  });
                  const jsonResponse = await response.json();
                  console.log('jsonResponse', jsonResponse);
                  const newMessage = jsonResponse.hobbyId;
                  console.log(newMessage);
                  window.location.href = `/inbox/${newMessage.hobbyId}`;
                }}
                <div>
                  <label htmlFor="subject">
                    <p>Subject</p>
                  </label>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.currentTarget.value)}
                    type="text"
                    placeholder="Subject"
                    name="subjecct"
                  />
                  <textarea
                    className="emailInputStyles"
                    value={text}
                    onChange={(e) => setText(e.currentTarget.value)}
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

export async function getServerSideProps(context) {
  const { getMessagesBySessionToken } = await import(
    '../../../utilities/database'
  );
  const { session: token } = nextCookies(context);

  if (!isSessionTokenValid(token)) {
    return {
      redirect: {
        destination: '/login?returnTo=/profile',
        permanent: false,
      },
    };
  }

  const id = context.query.id;

  const messages = await getMessagesBySessionToken(token);

  return {
    props: {
      messages: messages,
    },
  };
}
