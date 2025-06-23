const User=require('../models/Loginmodel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const Createuser= async (req , res)=>
{
    
        const {username,email,password}=req.body
    try{
        if(!username && !email && !password)
        {
            return res.status(400).json({message:"requred fileds are not foundd"})
        }

        const hashpassword=bcrypt.hashSync(password,10)
        console.log(hashpassword)

        const newUser=new User(
            {
                username,
                email,
                password:hashpassword
            }
        )
        await newUser.save()
        res.status(201).json(newUser)

    } catch(err)
    {
        console.log("The error at login controller",err)
        res.status(500).json({message:"error in Create user"})
    }
}



      const userLogin=async (req,res)=>
      { 
        const {username,password}=req.body;
        try{
            const Checkuser=await User.findOne({username})
            if(!Checkuser)
            {
                console.log("user not found")
                res.status(404).json({message:"user not found"})
            }

            const isPassword=bcrypt.compareSync(password,Checkuser.password)

            if(!isPassword)
            {
                  console.log("password not found")
                res.status(404).json({message:"password not found"})

            }

            jwt.sign({AdminId:Checkuser._id,username}, process.env.SECRET_KEY,(err,token)=>
            {
                if(err)
                {
                    return res.status(405).json({message:"internal server error"})
                }
                            res.status(201).json({jwtToken:token})

            })




        } catch(err)
        {
            console.log(err)
            res.status(201).json({message:"error at userLogin"})
        }
            
      }



      const getUser=async(req,res)=>
      {
        const adminId= req.adminId;
        try{

            const admin= await User.findOne({_id:adminId})
            res.status(200).json({data:admin})


        } catch(err)
        {
            console.log(err)
            res.status(400).json({message:"internal error"})


        }
      }


module.exports={Createuser,userLogin,getUser}