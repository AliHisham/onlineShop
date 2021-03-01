const mongoose = require('mongoose')

const ConnectDB = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI , {
            useUnifiedTopology:true , 
            useNewUrlParser:true, 
            useCreateIndex:true
        }).then((res)=>{
            console.log('connected ' ,  res.connection.host)
        })
    } catch (error) {
        console.log(error , 'errooroorroro')
    }
}
module.exports=ConnectDB