import { NextApiRequest, NextApiResponse } from 'next';
import {
  getUserById,
  deleteUserById,
  updateUserById,
} from '../../../utilities/database';

var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dbt8bob1p',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const userId = request.query.id as string;

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

    if (request.body.user.photo) {
      // Step 1 if exists, send base64 DataURI to hosting platform (imigix)
      // Step 2 hosting platfrom returns image URL
      // Step 3 put into database
      // newUser.photo = (await photoUpload(newUser.photoData)) || '';
      // delete newUser.photoData;
      const data = request.body.user.photo;

      const cloudinaryResponse = await cloudinary.uploader.upload_large(
        data,
        // options,
        function (error, result) {
          // const secure_url = 'https://res.cloudinary.com/dbt8bob1p/image/upload/v1606155964'(
          //   result.public_id,
          // );

          try {
            updateUserById(userId, result.secure_url);
            console.log(result, error);
            return response
              .status(200)
              .send({ success: true, newUser: result.secure_url });
          } catch (err) {
            console.error('Photo could not be updated');
            return response.status(500).send({ success: false });
          }
        },
      );
    }
    user = await updateUserById(parseInt(id), newUser);
  } else if (request.method === 'DELETE') {
    user = await deleteUserById(userId);
  }

  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify({ user: user }));
}
