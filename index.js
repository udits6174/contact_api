import express from 'express';
import 'dotenv/config';
// import * as dotenv from 'dotenv';
// dotenv.config();
import ContactRoutes from "./routes/contactRoutes.js"
import UserRoutes from "./routes/userRoutes.js"
import errorHandler from './middlewares/errorHandler.js';
import connectDB from './config/dbConnection.js';

connectDB();
const app = express();
const port = process.env.PORT || 8080;
//MIDDLEWARES
app.use(express.json()); // To convert string(from body) to json
app.use('/api/contacts', ContactRoutes);
app.use('/api/users', UserRoutes)
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})