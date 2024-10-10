import { configDotenv } from "dotenv";
import express from 'express'
import {mongoDB} from './finance-tracker/db/index'
import {router} from './finance-tracker/routes/route'

configDotenv()
const port = process.env.PORT || 4001
const app = express()

app.use(express.json())
app.use('/',router)

app.listen(port,async () => {
  try {
    await mongoDB()
    console.log(`Server is running on port: ${port}`)
  }catch(error){
    console.log(error)
  }
})