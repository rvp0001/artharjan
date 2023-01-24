import type { NextApiRequest, NextApiResponse } from 'next'
import fileServices from './services/fileServices'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {

    let serverdocid=''
    console.log('*************8444',req.body)
    console.log(req.body)
    if(req.body)
    serverdocid=req.body.params.serverdocid;
 


 console.log(serverdocid)

 if(serverdocid== null || serverdocid=='' )
{
  res.status(500).json({
    error: 'Please send file'
});
}
else{



  try
  {

  const file= await fileServices.logicaldeleteFile({z_id:serverdocid},{login_username:'rvp'})    
 
       res.status(201).json({
          message: "file  deleted!",
          documentid: file.z_id
        })

  }
  catch(err){
    console.log(err)
    console.log("Error deleting document");
    res.status(500).json({
      error: err,
      documentid: serverdocid
  });


  }

 




}
  //  res.status(200).json({ name: 'rvp' })
  }
  