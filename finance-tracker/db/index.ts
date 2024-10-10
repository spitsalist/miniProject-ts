import mongoose from "mongoose";

import { configDotenv } from "dotenv";

configDotenv();



export const mongoDB = async() => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URL || '')
    console.log(`connected to mongo db: ${conn.connection.host}`)
  }catch(error){
    console.error('error')
  }
}