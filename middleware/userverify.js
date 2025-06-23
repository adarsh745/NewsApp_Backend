const jwt=require('jsonwebtoken')

const verifyUser= async(req , res , next)=>
{
   const tocken = req.headers.authorization.split(" ")[1];
     if (!tocken) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }
  console.log(tocken)

    try{
       jwt.verify(tocken,process.env.SECRET_KEY,(err,decode)=>
       {

        if(err) 
        {
            return res.status(405).json({message:"forbidone error"})
           
        }
         
         console.log(decode)
         req.adminId=decode.AdminId
         next()

       })
     

    } catch(err)
    {
        console.log(err)
        res.ststus(201).json({message:" tocken error"})
    }



}

module.exports=verifyUser