import subscriptionServices from './services/subscriptionServices'
export default async (req, res) => {
    const subscription = req.body

    try{
  
  
      let savedSubscription = await subscriptionServices.saveSubscription({z_id:'',applicationid:'15001500', client:'45004500', lang:'EN', subobj:subscription},{login_username:''})
      let options={
        
        body:'Successfully Subscribed to RecoKart !',
        dir:'ltr',
        lang:'en-US',
        vibrate:[100,50,200],
        }
        
        let notification ={
          title:'Title-Successfully Subscribed to RecoKart !',
          options:options
        }
   
        await subscriptionServices.sendNotification(savedSubscription.subobj,notification)
  
        res.status(200).json({'success': true})
  
  
    }catch(err){
     
  
      console.log(err)
    }
  
    
  
   
  }