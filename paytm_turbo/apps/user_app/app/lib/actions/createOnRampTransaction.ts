'use server'

import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"


export default async function(amount:number,provider:string){
       
      const session = await getServerSession(authOptions);

      if(!session?.user || !session?.user.id){
           
        return {
            message:'Unauthenticated request'
        }
      }

       const token = (Math.random()*1000).toString();
       
      try{
             
        await prisma.onRampTransaction.create({
            data:{
                provider,
                amount:amount*100,
                startTime:new Date(),
                status:'Processing',
                token:token,
                userId:Number(session.user.id)
            }
        })

         return {
            message:'Done'
         }
      }
      catch(e){
          console.error(e);
              return {
                message:'error in transactions'
              }
      }

}