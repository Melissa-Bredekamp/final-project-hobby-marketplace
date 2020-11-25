var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dbt8bob1p',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function photoUpload(photoFile) {
  console.log(photoFile);
  const cloudinaryResponse = await cloudinary.uploader.upload_large(
    data,
    // options,
    async function (error, result) {
      console.log('error', error);
      if (error || !result || !result.secure_url) {
        console.error('', error);
        return response.status(500).send({ success: false });
      }
      return photoURL;
    },
  );
}
