import { useState } from 'react';
import { useRouter } from 'next/router';
import nextCookies from 'next-cookies';
import Head from 'next/head';
import Layout from '../components/Layout';
import { NextPageContext } from 'next';
import { UserWithDate, Message } from '../utilities/types';
import { getUserBySessionToken } from '../utilities/database';

// type Props = {
//   user: UserWithDate;
//   messages: Message[];
// };

export default function inbox(props) {
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
                return (
                  <div className="messagesStyles">
                    <div key={props.user.id}>
                      <h4>{`${message.hostFirstName} ${message.hostLastName}`}</h4>
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

export async function getServerSideProps(context) {
  // console.log(context, 'context.query');
  const id = context.query.id?.toString();
  const idNumber = context.query.id;
  const { session: token } = nextCookies(context);
  let user = await getUserBySessionToken(token);
  const { getCoversationsByUserId, userToReactProps } = await import(
    '../utilities/database'
  );
  //getCoversationByUserId
  console.log(idNumber);
  console.log(user);
  let messages = await getCoversationsByUserId(user.id);
  if (!user) {
    return {
      redirect: {
        destination: '/users/create-users',
        permanent: false,
      },
    };
  }

  const reactUser = await userToReactProps(user);
  console.log(messages, 'messages');

  // const props: { user?: UserWithDate; messages?: Message[] } = {};
  if (messages) user = reactUser;
  if (messages) messages = messages;

  return {
    props: { user: user, messages: messages },
  };
}
