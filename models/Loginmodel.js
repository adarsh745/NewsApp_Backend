const mongoose=require('mongoose')

const loginschema=new mongoose.Schema(
    {
        username:
        {
            type:String
        },
        email:
        {
            type:String,
        },
        password:
        {
            type:String
        }


    }
)

module.exports=mongoose.model("Login",loginschema)