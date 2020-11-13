import ImgixClient from 'imgix-core-js';

let client = new ImgixClient({
  domain: 'testing.imgix.net',
  secureURLToken: 'CSRF_TOKEN_SECRET',
});

let url = client.buildURL('/path/to/image.png', { w: 400, h: 300 });
console.log(url); // => 'https://testing.imgix.net/users/1.png?w=400&h=300&s=…'
