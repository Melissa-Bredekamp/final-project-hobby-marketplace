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
  let hobby;
  let hobbies;

  // console.log('getHobbyById', request.method, request.body);
  if (request.method === 'GET') {
    hobby = await getHobby();
  } else if (request.method === 'POST') {
    // const {
    //   newHobby: { hobbyOffer, availability, city, aboutMe },
    // } = request.body;
    const newHobby = request.body;
    const cookiesParsed = cookie.parse(request.headers.cookie);
    const sessionToken = cookiesParsed.session;
    const user = await getUserBySessionToken(sessionToken);

    if (user) {
      const userId = user?.id;
      hobbies = await insertHobby(userId, newHobby);
    }
  }

  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.send(
    JSON.stringify({
      // Only add "hobbies" key to object if users exists
      // (eg. GET request)
      ...(hobbies ? { hobbies: hobbies } : {}),
      // Only add "hobby" key to object if user exists
      // (eg. POST request)
      ...(hobby ? { hobby: hobby } : {}),
    }),
  );
}
