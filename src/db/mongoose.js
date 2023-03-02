const mongoose=require('mongoose')
const validator=require('validator')

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useCreateIndex:true
})

// const tasks=mongoose.model('tasks',{
//     description:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })

// const work1= new tasks({
//     description:'I have to do a work',
    
// })

// work1.save().then(()=>{
//     console.log(work1);
// }).catch((error)=>{
//     console.log(error);
// })

// const User=mongoose.model('user',{
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         validate(value)
//         {
//             validator.isEmail(value)
//         }
        
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         minlength:7,
//         validate(value){
//             if(value=="password")
//             throw new Error("invalid Password")
//         }
//     }
// })

// const myuser1=new User({
//     name:"Dhruv",
//     email:"dhruvbajoria2001@gmail.com",
//     password:"pasd1"

// })

// myuser1.save().then(()=>{
//     console.log(myuser1);
// }).catch((error)=>{
//     console.log(error);
// })

// const user=mongoose.model('users',{
//     name:{
//        type:String
//     },
//     age:{
//         type:Number
//     }
// })

// const me=new user({
//     name:'Dhruv',
//     age:22
// })

// me.save().then(()=>{
// console.log(me);
// }).catch((error)=>{
//     console.log(error);
// })


// const tasks=mongoose.model('tasks',{
//     description:{
//         type:String
//     },
//     completed:{
//         type:Boolean
//     }
// })
// const mytask=new tasks({
//     description:'Work1',
//     completed:true
// }) 

// mytask.save().then(()=>{
//     console.log(mytask);
// }).catch((error)=>{
//     console.log(error);

// })