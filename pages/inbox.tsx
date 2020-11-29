import { useState } from 'react';
import { useRouter } from 'next/router';
import nextCookies from 'next-cookies';
import Head from 'next/head';
import Layout from '../components/Layout';
import { isSessionTokenValid } from '../utilities/auth';
import { NextPageContext } from 'next';
import { UserWithDate, Message } from '../utilities/types';
import { getUserBySessionToken } from '../utilities/database';

type Props = {
  user: UserWithDate;
  messages: Message[] | Message;
};

export default function inbox(props: Props) {
  // id: 5,
  // firstName: null,
  // lastName: null,
  // email: null,
  // interests: null,
  // dateOfBirth: null,
  // username: 'test4',
  // city: null,
  // photo: null
  const [users, setUsers] = useState(props.user.id);
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const router = useRouter();
  console.log(props);
  return (
    <div>
      <Head>
        <title>Inbox</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <main>
          <div>
            <div className="messageFormStyles">
              <h1>Inbox</h1>

              {props.messages.map((message) => {
                // if (message.includes(props.user.id)) {
                //   const newMessage = message.push;
                // }
                return (
                  <div className="emailFormStyles">
                    <div key={props.user.id}>
                      <h4>{`${message.firstName} ${message.lastName}`}</h4>
                      <h4>{message.subject}</h4>
                      <p>{message.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <form
            className="FormStyles"
            onSubmit={async (event) => {
              event.preventDefault();
              const response = await fetch('/api/inbox', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  senderId: props.user.id,
                  subject: subject,
                  text: text,
                }),
              });
              const jsonResponse = await response.json();
              console.log('jsonResponse', jsonResponse);
              const newMessage = jsonResponse.userId;
              console.log(newMessage);
              window.location.href = `/inbox`;
            }}
          >
            <div className="emailFormStyles">
              {/* <h2>Message</h2>
              <h4>subject</h4> */}
              {/* <label htmlFor="subject">
                <h4>Subject</h4>
              </label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.currentTarget.value)}
                type="text"
                placeholder="Subject"
                name="subjecct"
              /> */}
              <textarea
                className="emailInputStyles"
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
                name="message"
                placeholder="Start typing your message..."
                rows="8"
                cols="30"
              ></textarea>
              <button className="centeredButtonStyles">Send</button>
            </div>
          </form>
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  console.log(context.query, 'contect.quesry');
  const id = context.query.id?.toString();
  const { session: token } = nextCookies(context);
  const user = await getUserBySessionToken(token);
  const { getCoversationsByUserId, userToReactProps } = await import(
    '../utilities/database'
  );
  //getCoversationByUserId
  console.log(id);
  const messages = await getCoversationsByUserId(user.id);
  if (!messages) {
    return {
      redirect: {
        destination: '/users/create-users',
        permanent: false,
      },
    };
  }
  console.log(messages, 'user127');
  const reactUser = userToReactProps(messages);

  const props: { user?: UserWithDate; messages?: Message[] } = {};
  if (messages) props.user = reactUser;
  if (messages) props.messages = messages;

  console.log(user, 'user');
  return {
    props: { user: user, messages: messages },
  };
}
