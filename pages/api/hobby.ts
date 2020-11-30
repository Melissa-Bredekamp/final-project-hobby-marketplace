import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  getHobby,
  insertHobby,
  getUserBySessionToken,
} from '../../utilities/database';

//
export default async function hobbyHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'GET') {
  } else if (request.method === 'POST') {
    if (!request.headers.cookie) {
      return response.status(401).send({ success: false });
    }

    const newHobby = request.body.hobby;
    console.log(request.body, 'response.body');
    const cookiesParsed = cookie.parse(request.headers.cookie);
    const sessionToken = cookiesParsed.session;
    const user = await getUserBySessionToken(sessionToken);

    if (user) {
      const userId = user?.id;
      const hobby = await insertHobby(userId, newHobby);
      response.send({
        hobby: hobby,
      });
    } else {
      console.log('request user not found', user, sessionToken);
    }
  }
}
