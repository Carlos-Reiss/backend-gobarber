import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tempfolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tempfolder,

  storage: multer.diskStorage({
    destination: tempfolder,
    filename: (request, file, callback) => {
      const filehash = crypto.randomBytes(10).toString('hex');

      const fileName = `${filehash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
