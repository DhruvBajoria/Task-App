const express=require('express')
require('./db/mongoose')
const User=require('./model/users.js')
const Tasks=require('./model/tasks.js')

const userroutes=require('./router/user')
const taskroutes=require('./router/task')

const app=express()
// app.use((req,res,next)=>{
//    if(req.method==='GET'){
//      res.send('GET request are disabled')
//    }else{
//     next()
//    }
// })


// app.use((req,res,next)=>{
//     res.status(503).send('Site is currently down check back soon')
// })
app.use(express.json())

app.use(userroutes)
app.use(taskroutes)





const port=process.env.PORT||3000

// const multer=require('multer')
// const upload=multer({
//     dest:'images',
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please upload a word document'))
//         }
//         cb(undefined,true)
//     //    cb(new Error('File must be a pdf'))
//     //    cb(undefined,true)
//     }
// })
// // const errorMiddleware=(req,res,next)=>{
// // throw new Error('From my middleware')
// // }
// app.post('/upload', upload.single('upload'),(req,res)=>{
//     res.send()
// },(error,req,res,next)=>{
//     res.status(400).send({error:error.message})
// })



//creating user in database

app.listen(port,()=>{
    console.log('Server is up on port'+port);


})
// const Task=require('./model/tasks')
// const Users=require('./model/users')
// const main = async()=>{
// //   const task=await Task.findById('63fdb517afd6cb4a0ccde7e7')
// //   await task.populate('owner').execPopulate()
// //   console.log(task.owner);
// // const user=await Users.findById('63fcaaf9fa4678288450ff43')
// // await user.populate('tasks').execPopulate()
// // console.log(user.tasks);
// }
// main()
// const pet={
//     name:'HAl'
// }
// pet.toJSON=function(){
//     return {}
// }
// console.log(JSON.stringify(pet));

// const jwt=require('jsonwebtoken')

// const myFunction= async()=>{
//     const token=jwt.sign({_id:'abc123'},'thisismynewcourse',{expiresIn:'7days'})
//     console.log(token);

//    const data= jwt.verify(token,'thisismynewcourse')
//    console.log(data);
// }
// myFunction()