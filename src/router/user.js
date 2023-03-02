const express=require('express')
const router=express.Router()
const User=require('../model/users')
const sharp=require('sharp')
const {sendWelcomeEmail}=require('../emails/account')
const  {cancelemail}=require('../emails/account')
const auth=require('../middleware/auth')
const multer=require('multer')
router.post('/users',async (req,res)=>{
    const user=new User(req.body)
    try{
       
       await user.save()
       sendWelcomeEmail(user.email,user.name)
       const token=await user.generateAuthToken()
       res.status(201).send({user,token})

    }
    catch(e){
       res.status(400).send(e)
    }
})

router.post('/users/login',async (req,res)=>{
    try{

        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.send({user,token})
    }catch(e){

        res.status(400).send(e)
    }
})


router.post('/users/logout',auth,async(req,res)=>{
    try{
req.user.tokens=req.user.tokens.filter((token)=>{
    return token.token!==req.token
})
await req.user.save()
res.send()
    }catch(e){
      res.status(500).send()
    }
})

router.post('/users/logoutall',auth,async(req,res)=>{
    try{

        req.user.tokens=[]
        await req.user.save()
        res.send()
    }catch(e){
      res.status(500).send()
    }
})
router.get('/users/me',auth,async(req,res)=>{
   res.send(req.user)
})

router.get('/users/:id',async(req,res)=>{
   try{
       const users=await User.findById(req.params.id)
       if(!users)
       {
           return res.status(404).send()
       }
       res.send(users)
   }catch(e)
   {
       res.status(500).send()
   }
})

router.patch('/users/me',auth,async (req,res)=>{
  // const userId=req.params.id
   const updates=Object.keys(req.body)
   const allowedParams=["name","age","email","password"]
   const isValid=updates.every((update)=>allowedParams.includes(update))
   if(!isValid)
   {
       return res.status(400).send({error:'Invalid Operation'})
   }
    try{

       //const users=await User.findByIdAndUpdate(userId,req.body,{new:true,runValidators:true})
       updates.forEach((update)=>req.user[update]=req.body[update])
       await req.user.save()
       
       res.send(req.user)
    }catch(e){
         res.status(400).send()
    }
})

router.delete('/users/me',auth,async(req,res)=>{
    //const userid=req.user._id
    try{
        //const user=await User.findByIdAndDelete(userid)
        // if(!user){
        //     return res.status(404).send()
        // }
    await req.user.remove()
    // cancelemail(req.user.email,req.user.name)
        res.send(req.user)

    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})

const upload=multer({
   
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
        {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined,true)
    }
})
router.post('/users/me/avatar',auth,upload.single('avatar'), async(req,res)=>{
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user||!user.avatar)
        {
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})

module.exports=router