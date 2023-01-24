import nextConnect from 'next-connect';
import {v4 as uuidv4} from 'uuid'
import { dirname } from 'path';
import fileServices from './services/fileServices'

const DIR = './public/fileuploads';



//import  multer  from 'multer';
const multer = require('multer');
const storage = multer.diskStorage({
  destination: DIR,
  filename: (req, file, cb) => {
  
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" 
      || file.mimetype == "image/jpg" 
      || file.mimetype == "image/jpeg"
    
    
    ) {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
});


const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('files'));

apiRoute.post(async(req, res) => {

   console.log('342343424242424242424242424242424242424')
    // console.log(req.files)
    // res.status(201).json({
    //     message: "Done upload!",
    //     fileCreated: {
    //         z_id: 'file.z_id',
    //         fileCollection: [{fileid:'file.fileid',filepath:'file.filepath',filename:'abcd',filetype:'png',filesize:'100'}] 
    //     }
    //   })





      let reqFiles = [];
      //const url = req.protocol + '://' + req.get('host')
      const url = '/fileuploads'
      for (var i = 0; i < req.files.length; i++) {
        console.log(req.files[i])
        console.log(url + '/' + req.files[i].filename)
          reqFiles.push( {filepath:url + '/' + req.files[i].filename,
                          fileid:  req.files[i].filename,
                          filename:  req.files[i].originalname,
                          filetype:  req.files[i].mimetype,
                          filesize:  req.files[i].size.toString(),
                          storage:storage
                        })
      }
    
      try
      {
      const {filepath,fileid,filename,filetype,filesize} =  reqFiles[0];
      const file= await fileServices.saveFile({filepath,fileid,filename,filetype,filesize},{login_username:'rvp'})    
      console.log(file)
            res.status(201).json({
              message: "Done upload!",
              fileCreated: {
                  z_id: file.z_id,
                  fileCollection: [{fileid:file.fileid,filepath:file.filepath,filename:file.filename,filetype:file.filetype,filesize:file.filesize}] 
              }
            })
    
    
      }
      catch(err){
        console.log(err)
        res.status(500).json({
          error: 'error in upload'
      });
    
    
    
      }










});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};