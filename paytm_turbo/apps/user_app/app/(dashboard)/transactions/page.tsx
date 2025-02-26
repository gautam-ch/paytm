import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"

import db from '@repo/db/client'
import Transaction from "../../../components/Transactions";



async function getP2PTransfer(){
    const session = await getServerSession(authOptions);
      const tranx=await db.p2pTransfer.findMany({
        where:{
            OR:[
             {fromUserId:Number(session.user.id)},
             {toUserId:Number(session.user.id)}
            ]
        }
      })

      return {tranx,id:session.user.id};
}







export default async  function Transactions(){
    const {tranx,id}=  await getP2PTransfer();
    console.log('p2p transfer ',tranx,id);
    return (
        <div className="w-full h-full">  
              
               <Transaction p2ptransfer={tranx} id={Number(id)}></Transaction>           
        </div>
    )
}

