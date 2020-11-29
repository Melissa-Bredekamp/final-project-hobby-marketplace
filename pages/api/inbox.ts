import { NextApiRequest, NextApiResponse } from 'next';
import {
  insertMessage,
  getCoversationsByUserId,
} from '../../utilities/database';

export default async function messageHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  console.log(request.body);
  let messages;
  let message;
  if (request.method === 'GET') {
    messages = await getCoversationsByUserId(6);
  } else if (request.method === 'POST') {
    const newMessage = request.body;
    const senderId = request.body.senderId;
    message = await insertMessage(senderId, newMessage);
  }
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.send({
    messages: messages,
  });
}
