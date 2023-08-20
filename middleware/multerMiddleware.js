import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    // set the directory where uploaded files will be stored
    callBack(null, 'public/uploads');
  },
  filename: (req, file, callBack) => {
    const fileName = file.originalname;
    // set the name of the uploaded file
    callBack(null, fileName);
  },
});
const upload = multer({ storage });

export default upload;

/*
Multer is a popular middleware package for handling multipart/form-data in Node.js web applications. 
It is commonly used for handling file uploads. 
Multer simplifies the process of accepting and storing files submitted through HTTP requests by providing an easy-to-use API. 
It integrates seamlessly with Express.js and allows developers to define upload destinations, 
file size limits, and other configurations.
*/