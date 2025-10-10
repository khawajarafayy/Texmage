import express from 'express';
import cors from 'cors';
import 'dotenv/config' 
import connectDB from "./config/mongodb.js"
import userRoute from "./routes/userRoute.js"
import imageRoute from "./routes/imageRoute.js"
import errorMiddleware from './middlewares/error-middleware.js';

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json());
app.use(cors());

app.use("/", userRoute);
app.use("/image", imageRoute);

app.use(errorMiddleware);

connectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log(`Server running on port http://localhost:${PORT}`);
})
})