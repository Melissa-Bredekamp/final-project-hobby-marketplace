import { NextApiRequest, NextApiResponse } from 'next';
import {
  getUserById,
  deleteUserById,
  updateUserById,
} from '../../../utilities/database';
import {photoUpload} from '../../../utilities/storage';

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
    
    // console.log(request.body.user.photo);

    if (newUser.photoFile) {
      // 1. request.....photo -> photoFile. .photo ist ab jetzt immer die URL. .photoFile = neues Bild im edit user request only.
      // 2. neue Funktion schreiben: photoFile übergeben und photoUrl erhalten.
      // 3.
        newUser.photo = (await photoUpload(newUser.photoFile)) || '';
         delete newUser.photoFile;
      const data = request.body.user.photo;

          // console.log('x1 updateUserById', userId, {
          //   photo: result.secure_url,
          // });
          const user = await updateUserById(userId, {
            photo: result.secure_url,
          });
          // console.log('x2 updateUserById', userId, user);
          // return response.status(200).send({ success: true, user: user });
        }
    } 
    else
    user = await updateUserById(parseInt(userId), newUser);
  else if (request.method === 'DELETE') {
    user = await deleteUserById(userId);
  }

  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({ success: true, user: user }));
}
