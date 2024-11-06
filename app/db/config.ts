import env from 'dotenv'
import mongoose from 'mongoose'
env.config()

export const connectDB = async ()=>{
    mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log('Banco Conectado !!')
}
