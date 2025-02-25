"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from  "@repo/db/client"



export default async function(number:string,amount:string,provider:string){
    
        const session = await getServerSession(authOptions);

   

        if(!session?.user || !session?.user.id ){
            return {
                message:"Unauthenticated request"
            }
        }
                
        console.log(session.user);
        try{
                const receiver = await db.user.findUnique({
                    where:{
                        number
                    }
                })
                
                if(!receiver){  
                    throw new Error("User is not found");
                }

                  console.log('receiver',receiver);

                 let amntPaise = Number(amount)*100;                    
                   
                  await db.$transaction(async()=>{
                          
                         let Id=Number(session.user.id);
                                
                         const res= await db.$queryRaw<{id:number,amount:number,userId:number,locked:number}[]>`select * from "Balance" where "userId"=${Id} for update`
                           
                         console.log("db_res",res);

                         if (res.length === 0 || (res[0] && res[0].amount < amntPaise)) {
                            throw new Error("Insufficient balance");
                        }

                         await db.$executeRaw`update "Balance" set amount=amount-${amntPaise} where "userId"=${Id}`

                           
                         Id=Number(receiver.id);

                         await db.$executeRaw`update "Balance" set amount=amount+${amntPaise} where "userId"=${Id}`

                         await db.p2pTransfer.create({
                            data:{
                                amount:amntPaise,
                                timestamp:new Date(),
                                fromUserId:Number(session.user.id),
                                toUserId:Id 
                            }
                         })

                          
                  })    
                return {
                    message:'Done'
                }

        }
        catch(e){
            
            console.error(e);

            return {
                message:'Error in transfering money in p2p'
            }
        }

}