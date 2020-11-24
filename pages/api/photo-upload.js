import Formidable from 'Formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function uploadFormFiles(req: Request, res: Response) {
  return new Promise(async (resolve, reject) => {
    const form = new Formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
    });

    form
      .on('file', (name: string, file: File) => {
        const data = fs.readFileSync(file.path);
      })
      .on('aborted', () => {
        reject(res.status(500).send('Aborted'));
      })
      .on('end', () => {
        resolve(res.status(200).send('done'));
      });

    await form.parse(req);
  });
}
