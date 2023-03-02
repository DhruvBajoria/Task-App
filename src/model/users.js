const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Task=require('./tasks')

const Userschema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value)
        {
            validator.isEmail(value)
        }
        
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value=="password")
            throw new Error("invalid Password")
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value)
        {
            if(value<0)
            throw new Error("Invalid Age")
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})

Userschema.virtual('tasks',{
    ref:'tasks',
    localField:'_id',
    foreignField:'owner'
})


Userschema.methods.toJSON=function(){
    const user=this
    const userObject=user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

Userschema.methods.generateAuthToken= async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)

    user.tokens=user.tokens.concat({ token})
    await user.save()

    return token

}

Userschema.statics.findByCredentials=async(email,password)=>{
   const user=await User.findOne({email})
   if(!user)
   {
    throw new Error('Unable to log in')
   }

   const match=await bcrypt.compare(password,user.password)
   if(!match)
   {
    throw new Error('Unable to log in')
   }
   return user
}

//hash the plain text password before saving
Userschema.pre('save',async function(next) {
 const user=this;
 if(user.isModified("password")){
    user.password=await bcrypt.hash(user.password,8)
 }
 next()
    
})

//deletes user task when user is removed
Userschema.pre('remove',async function(next){
    const user=this
    await Task.deleteMany({owner:user._id})
    next()
})

const User=mongoose.model('user',Userschema)




module.exports=User
