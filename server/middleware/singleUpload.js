// middleware/multer.js
import multer from 'multer';

const storage = multer.memoryStorage(); // or diskStorage if you save locally

export const singleUpload = multer({ storage }).single('file');
