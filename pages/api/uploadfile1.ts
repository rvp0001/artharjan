// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'
/*
import nextConnect from "next-connect";
import dotenv from 'dotenv';
import {v4 as uuidv4} from 'uuid'
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser  from 'body-parser';
import fileServices from './services/fileServices'

dotenv.config()
type Data = {
  name: string
}

const DIR = './fileuploads';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname)
//console.log(__dirname)
//server.use('/fileuploads', express.static(path.join(__dirname, '/fileuploads')))


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
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

export  async function handler(
  req,
  res
) {
  const reqFiles = [];
  //const url = req.protocol + '://' + req.get('host')
  const url = '/fileuploads'
  console.log(req.files)
  res.send("ok")
  for (var i = 0; i < req.files.length; i++) {
    console.log(req.files[i])
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


}


export default async (req, res) => {
  if (req.method === 'POST') {
    async upload.array('files')  (req, res, err => {

      const reqFiles = [];
      //const url = req.protocol + '://' + req.get('host')
      const url = '/fileuploads'
      console.log(req.files)
      res.send("ok")
      for (var i = 0; i < req.files.length; i++) {
        console.log(req.files[i])
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
  } else {
    res.status(405).end();
  }
};

*/
// import connect from 'next-connect';
// import multer from 'multer';

// const handler = connect();
// const upload = multer();

// handler.use(upload.array('files'));

// handler.post(async (req, res) => {
//   console.log('^^^^^^^^req^^^^^^^^^,files',req.files.length)
//   const files = req.files;
//   // Do something with the files (e.g. save them to the server)
//   res.json({ success: true });
// });
 

// export default handler;


//import * as multer from 'multer';


export default async (req, res) => {
  console.log('dddddtttttteeeeeeeeeddddddddddddd')
    
     console.log('4444444444444444444')
     console.log(req.body)
     console.log(req.files)
    //  const files = req.files;
    // console.log('files',files.length)
    // Do something with the files (e.g. save them to the server)
    res.status(201).json({
      message: "Done upload!",
      fileCreated: {
          z_id: 'file.z_id',
          fileCollection: [{fileid:'file.fileid',filepath:'file.filepath',filename:'abcd',filetype:'png',filesize:'100'}] 
      }
    })
};
