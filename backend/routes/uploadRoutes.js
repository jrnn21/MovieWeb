import path from 'path';
import express from 'express';
import multer from 'multer';
import fs from 'fs';
const dirname = path.dirname(new URL(import.meta.url).pathname);
const __dirname = dirname.substring(1, dirname.length - 15);

const router = express.Router();

const storage = multer.diskStorage({
 destination(req, file, cb) {
  cb(null, 'uploads/videoUploads');
 },
 filename(req, file, cb) {
  cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
 },
});

function checkFileType(file, cb) {
 const filetypes = /jpg|jpeg|png/;
 const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
 const mimetype = filetypes.test(file.mimetype);

 if (extname && mimetype) {
  return cb(null, true);
 } else {
  cb('Images only!');
 }
}

const upload = multer({
 storage,
 fileFilter: function (req, file, cb) {
  checkFileType(file, cb);
 },
});

router.post('/', upload.single('image'), (req, res) => {
 res.send(`/${req.file.path}`);
});

router.post('/delete', upload.single('image'), async (req, res) => {
 const filePath = __dirname + req.body.img;
 try {
  if (req.body.img !== '/uploads/videoUploads/default-image.jpg') {
   fs.unlinkSync(filePath);
   res.json({ suc: 'gg' });
  } else {
   res.json({ suc: 'gg' });
  }
 } catch (err) {
  console.error(err);
 }
});

export default router;
