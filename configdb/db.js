const mongoose=require('mongoose')

const dbconnect=async ()=>
{
    try{
        const connect=await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo db is connected succefully")

    } catch(err)
    {
        console.log(err)
    }
}

module.exports=dbconnect