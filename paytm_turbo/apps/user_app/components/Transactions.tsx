

interface p2pType{
    id:number,
    amount:number,
    timestamp:Date,
    fromUserId:number,
    toUserId:number,
    
}

interface  p2pTransfer{
     p2ptransfer:p2pType[],
     id:number
}


export default async function Transaction({p2ptransfer,id}:p2pTransfer){
     

       return ( 
              <div className="w-full h-full">
                    <div className="text-3xl text-[#6a51a6] font-bold  mt-8 ml-3">
                        Transactions
                    </div>
                   <div className="min-h-80 flex justify-center mt-10">
                           
                            <div className="w-[70%] shadow-xl rounded-xl p-2  border-t-2  ">
                                <div className="flex justify-center">
                                    {
                                        p2ptransfer.length===0?(
                                                <div className="text-3xl  text-[#6a51a6] mt-30 font-semibold ">
                                                    No Recent Transactions!
                                                </div>
                                        ):
                                        (

                                            <div>
                                            {
                                            p2ptransfer.map(t=>(
                                                t.fromUserId===id?Trnx('debit',t.amount,t.timestamp):Trnx('credit',t.amount,t.timestamp)
                                            ))
                                            }
                                          </div>

                                        )
                                    }
                             
                                </div>
                            </div>
                    </div>
              </div>  
       )
}




function Trnx(type:string,amount:number,time:Date){

    return (
           <div className="min-w-120 border-b-2  border-slate-400 m-2 flex justify-between">
                 
                 <div>
                      
                      <div className="text-1xl font-bold text-slate-600">
                        {type}
                      </div>
                      <div className="text-xs text-slate-300 pt-1">
                          {time.toDateString()}                         
                      </div>
                 </div>

                 <div className=" flex items-center">
                     
                      <div className={`text-xl  ${type==='credit'?'text-green-500':'text-red-500'}`}>
                               {`${type==='credit'?`+ ${amount/100} INR`:`-  ${amount/100} INR`}`}
                      </div>
                          

                 </div>
                  
             
                

           </div>
    )

}