import { NextApiRequest, NextApiResponse } from 'next';
import { insertMessage, getMessages } from '../../utilities/database';

export default async function messageHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  let messages;
  let message;
  if (request.method === 'GET') {
    messages = await getMessages();
  } else if (request.method === 'POST') {
    const newMessage = request.body.message;
    message = await insertMessage(newMessage.id, newMessage);
  }
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.send({
    messages: messages,
  });
}
