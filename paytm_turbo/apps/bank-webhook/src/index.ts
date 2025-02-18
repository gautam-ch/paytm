import express from 'express';
import db from '@repo/db/client';



const app = express();

app.post('hdfcWebhook',async (req,res)=>{
        const payInfo={
            userId:req.body.userId,
            token:req.body.token,
            amount:req.body.amount
        }
        
        try{
         await db.$transaction([
             db.balance.updateMany({
                where:{
                    userId:payInfo.userId,
                },
                data:{
                    amount:{
                        increment:payInfo.amount  
                    }
                    
                }
            }),
    
            db.onRampTransaction.updateMany({
                where:{
                    token:payInfo.token
                },
                data:{
                    status:'Success'
                }
    
            }),
    
          
        ])
        res.status(200).json({
            msg:'Captured'
        })
      }
      catch(e){
          console.error(e);
        res.status(411).json({
            msg:'Error while processing webhook '
        })
      }

       
})

app.listen(3003),()=>{
    console.log('express webhook running');
};
