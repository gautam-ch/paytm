import express from 'express';
const db = require("@repo/db/client").default; 




const app = express();

app.use(express.json());

app.post('/hdfcWebhook',async (req,res)=>{
        const payInfo={
            userId:req.body.userId,
            token:req.body.token,
            amount:req.body.amount
        }
        
        try{
         await db.$transaction([
             db.balance.update({
                where:{
                    userId:payInfo.userId,
                },
                data:{
                    amount:{
                        increment:payInfo.amount  
                    }
                    
                }
            }),
    
            db.onRampTransaction.update({
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

app.get('/hdfc',(req,res)=>{
    res.json({
        msg:req.body
    })
})

app.listen(3003,()=>{
    console.log('express webhook running');
});
