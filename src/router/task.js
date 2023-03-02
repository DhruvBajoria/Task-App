const express=require('express')
const router=express.Router()
const auth=require('../middleware/auth')
const Tasks=require('../model/tasks')

router.post('/tasks',auth,async (req,res)=>{
    const task=new Tasks({
        ...req.body,
        owner:req.user._id 
    })
    try{
       //const task=new Tasks(req.body)
       await task.save()
       res.status(201).send(task)

    }
    catch(e){
       res.status(400).send()
    }
})

//get /task?completed=true
//get /task?limit=2&skip=2
//get /task?sortBy=createdAt:desc
router.get('/tasks',auth,async(req,res)=>{
   const match={} 
   const sort={}
   if(req.query.completed)
   {
       match.completed=req.query.completed==='true'
   }

   if(req.query.sortBy){
    const parts=req.query.sortBy.split(':')
    sort[parts[0]]=parts[1]==='desc'?-1:1
   }
   
    try{
    //    const task=await Tasks.find({owner:req.user._id})
    //    if(!task)
    //    {
    //        return res.status(404).send()
    //    }
    await req.user.populate({
        path:'tasks',
        match,
        options:{
            limit:parseInt(req.query.limit),
            skip:parseInt(req.query.skip),
            sort
        }
    }).execPopulate()
       res.send(req.user.tasks)
   }catch(e)
   {
       res.status(500).send()
   }
})


router.get('/tasks/:id',auth,async(req,res)=>{
   const _id=req.params.id
    try{
       // const tasks=await Tasks.findById(_id)
       const task = await Tasks.findOne({_id,owner:req.user._id})
       if(!task)
       {
           return res.status(404).send()
       }
       res.send(task)
   }catch(e)
   {
       res.status(500).send()
   }
})

router.patch('/tasks/:id',auth,async (req,res)=>{
   //const taskId=req.params.id
   const updates=Object.keys(req.body)
   const allowedParams=["descriptions","completed"]
   const isValid=updates.every((update)=>allowedParams.includes(update))
   if(!isValid)
   {
       res.status(400).send({error:'Invalid updates!!'})
   }
    try{
       const task=await Tasks.findOne({_id:req.params.id,owner:req.user._id})
       //const tasks=await Tasks.findByIdAndUpdate(taskId,req.body,{new:true,runValidators:true})
       if(!task)
       {
           return res.status(404).send()
       }
       updates.forEach((update)=>task[update]=req.body[update])
       await task.save()
       return res.send(task)
    }catch(e){
         res.status(400).send()
    }
})
router.delete('/tasks/:id',auth,async(req,res)=>{
    //const _id=req.params.id
    try{
        //const task=await Tasks.findOneAndDelete({})
        const task=await Tasks.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)

    }catch(e){
        res.status(500).send()
    }
})


module.exports=router