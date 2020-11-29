import {
  getHobbyById,
  deleteHobbyById,
  insertHobby,
} from '../../utilities/database';
import { photoUpload } from '../../utilities/storage';

var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dbt8bob1p',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(request, response) {
  const hobbyId = request.query.hobbyId;

  if (!/^\d+$/.test(hobbyId)) {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'application/json');
    return response.end(JSON.stringify({ errors: 'Not found' }));
  }

  let hobby = {};

  if (request.method === 'GET') {
    hobby = await getHobbyById(hobbyId);
  } else if (request.method === 'PATCH') {
    const newHobby = request.body.hobby;

    if (newHobby.photoFile) {
      newHobby.photo = (await photoUpload(newHobby.photoFile)) || '';
      console.log('photo url x1', newHobby.photo);
      delete newHobby.photoFile;

      hobby = await insertHobby(hobbyId, newHobby);
    } else if (request.method === 'DELETE') {
      hobby = await deleteHobbyById(hobbbyId);
    }

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify({ success: true, hobby: hobby }));
  }
}
