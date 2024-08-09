import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import auth from './routes/auth.js'
import hospitals from './routes/hospitals.js'

// Load environment variables
dotenv.config();

mongoose.set('strictQuery', false)
//Database connectivity
const connect_Database = async () => {
  try {
    const client = await mongoose.connect(process.env.DATABASE);
    console.log(`Connected to MongoDB.....`);
    return client;

  } catch (error) {
    console.error(error)
    process.exit(1);
  }
}
// The below function is responsible for the connection of database
connect_Database()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    { origin: true, credentials: true }
))

app.use('/auth', auth)
app.use('/hospitals', hospitals)

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`start server in port ${port}`))