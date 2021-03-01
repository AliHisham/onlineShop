const dotenv = require ('dotenv')
const mongoose = require('mongoose')
const Users = require('./data/user')
const Products = require('./data/products')
const UserModel = require('./models/users')
const ProductModel = require('./models/products')
const OrderModel = require('./models/order')
const DbConfig= require('./DbConfig/dbconfig')

dotenv.config()
DbConfig()

const importData = async()=>{
    try {
        await UserModel.deleteMany()
        await ProductModel.deleteMany()
        await OrderModel.deleteMany()
        const createdUSers = await UserModel.insertMany(Users)
        const adminUser = createdUSers[0]._id
        const sampleProducts = Products.map((product)=>{
            return{...product , user:adminUser}
        })
        await ProductModel.insertMany(sampleProducts)

        console.log("data imported ya ali")
        
    } catch (error) {
        console.error(`${error} ali hesham is here`)
    }
}

importData()