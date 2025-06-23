const User=require('../models/user')

const bcrypt=require("bcrypt")

const jwt=require('jsonwebtoken')

const createUser= async(req , res)=>
{
    const [email, password, username]= req.body

    try{
        if(!email && !password && !username)
        {
            return res.status(401).json({message:"fielsd are reuqired"})
        }

        const hashpassword=bcrypt.hashSync(password,10)

        console.log(hashpassword)



        const Userdetails= new User({
            email,
            password:hashpassword,
            username

        }) 

        await User.save()
        res.status(201).json({message:"user created succesfull"})

    }catch(err)
    {
        console.log(err)
        res.status(401).json({message:"error at create user controller"})
    }
}


const  Loginuser= async (req,res)=>
{
    const [username,password]=req.body

    try{

        const finduser=await User.findOne({username})

        if(!finduser)
        {
           consol.log("user not found")
           res.status().json({message:"user not found"})
        }



        const comp_password=bcrypt.compareSync(password.finduser,password)



        if(!comp_password)
        {
            res.status(401).json({message:"password not found"})
        }

        jwt.sign({AdminId:finduser._id,username},process.env.SECRET_KEY,(res,tocken)=>
        {
            if(!tocken)
            {
                res.status().json({message:"tocken not found"})
            }
            res.status(200).json({jwtTocken:tocken})
        })

        



    } catch(err)
    {
        console.log(err)
        res.status(401).json({message:"error at Loging user not found"})



    }
    
}


const Admin=async(req,res)=>
{
    const AdminId=req.AdminId
    try{

        const admin=await User.findOne({_id:AdminId})
        res.status(201).json({data:admin})

    }catch(err)
    {
        consol.log(err)

        res.status(404).json({message:"internal server error"})

    }
}


module.exports={createUser,Loginuser,Admin}