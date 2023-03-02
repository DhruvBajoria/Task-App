//const mongodb=require('mongodb')
//const MongoClient=mongodb.MongoClient
//how to connect mongodb
const {MongoClient,ObjectId}=require('mongodb')

const id=new ObjectId()
// console.log(id);
// console.log(id.getTimestamp());

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

MongoClient.connect(connectionURL,(error,client)=>{
    if(error)
    {
        return console.log('Unable to connect to database')
    }
    const db=client.db(databaseName)

    // db.collection('users').deleteMany({
    //     age:22
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })
    db.collection('users').deleteOne({
        age:27
    }).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    })


    // db.collection('tasks').updateMany({
    //     completed:false
    // },{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })

    // db.collection('users').updateOne({
    //     _id:ObjectId('63eb3264ad997a5dd478d066')
    // },{
    //     $set:{
    //         name:'Bajoria'
    //     },
    //     $inc:{
    //         age:1
    //     }
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })

    // db.collection('users').insertOne({
    //     name:"Dhruv",
    //     age:22
    // },(error,result)=>{
    //     if(error)
    //     {
    //         return console.log('Unable to insert');
    //     }
    //     console.log(result.ops);
    // })
    // db.collection('users').insertMany([
    //     {
    //         name:'Raj',
    //         age:24
    //     },{
    //         name:'sunny',
    //         age:27
    //     }
    // ],(error,result)=>{
    //     if(error)
    //     {
    //         return console.log('Unable to insert');
    //     }

    //     console.log(result.ops);

    // })
    // db.collection('tasks').insertMany([
    //     {
    //         description:'Work',
    //         completed:false
    //     },{
    //         description:'Work2',
    //         completed:true
    //     }
    // ],(error,result)=>{
    //     if(error)
    //     {
    //         return console.log('Unable to insert the data');
    //     }
    //     console.log(result.ops);
    // })

})