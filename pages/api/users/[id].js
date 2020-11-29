import { NextApiRequest, NextApiResponse } from 'next';
import {
  getUserById,
  deleteUserById,
  updateUserById,
} from '../../../utilities/database';
import { photoUpload } from '../../../utilities/storage';

var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dbt8bob1p',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(request, response) {
  const userId = request.query.id;

  if (!/^\d+$/.test(userId)) {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'application/json');
    return response.end(JSON.stringify({ errors: 'Not found' }));
  }

  let user = {};

  if (request.method === 'GET') {
    user = await getUserById(userId);
  } else if (request.method === 'PATCH') {
    const newUser = request.body.user;

    if (newUser.photoFile) {
      newUser.photo = (await photoUpload(newUser.photoFile)) || '';
      console.log('photo url x1', newUser.photo);
      delete newUser.photoFile;
    }

    user = await updateUserById(userId, newUser);
  } else if (request.method === 'DELETE') {
    user = await deleteUserById(userId);
  }

  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({ success: true, user: user }));
}
