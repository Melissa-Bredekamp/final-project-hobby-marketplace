import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  getHobby,
  insertHobby,
  getHobbyBySessionToken,
} from '../../utilities/database';

//
export default async function hobbyHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // console.log('getHobbyById', request.method, request.body);
  if (request.method === 'GET') {
    // rewrite this code when needed
    // hobby = await getHobby();
  } else if (request.method === 'POST') {
    if (!request.headers.cookie) {
      // TODO: Return proper message from the server
      return response.status(401).send({ success: false });
    }

    const newHobby = request.body.hobby;
    console.log(request.body, 'response.body');
    const cookiesParsed = cookie.parse(request.headers.cookie);
    const sessionToken = cookiesParsed.session;
    const user = await getHobbyBySessionToken(sessionToken);

    if (user) {
      const userId = user?.id;
      const hobby = await insertHobby(userId, newHobby);
      response.send({
        hobby: hobby,
      });
    }
  }

  // response.send({
  //Only add "hobbies" key to object if users exists
  //(eg. GET request)
  //   ...(hobbies ? { hobbies: hobbies } : {}),
  //Only add "hobby" key to object if user exists
  //(eg. POST request)
  //   ...(hobby ? { hobby: hobby } : {}),
  // });
}
