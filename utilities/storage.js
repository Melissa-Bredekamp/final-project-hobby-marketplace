var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dbt8bob1p',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function photoUpload(photoFile) {
  // console.log(photoFile);
  const cloudinaryResponse = await cloudinary.uploader.upload_large(
    photoFile,
    // options,
    function (error, result) {
      if (error) {
        console.error('photoUpload error', error);
      }
    },
  );
  if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
    console.error('photoUpload sth went wrong, reponse:', cloudinaryResponse);
    return '';
  }
  const photoURL = cloudinaryResponse.secure_url;
  return photoURL;
}
