const usercontroler=require('../controllers/usercontroller')
const verifyUser=require('../middleware/userverify')

const express=require('express')


const router=express.Router()

router.post("/postuser",usercontroler.Createuser)

router.post("/userlogin",usercontroler.userLogin)

router.get('/getuser',verifyUser,usercontroler.getUser)


module.exports=router