import express from "express"
import dotenv from "dotenv"
import connectDB from "./utils/connectDb.js";
import cors from "cors";
import userRoute from "./routes/UserRoute.js"
const app = express();
dotenv.config({});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));
const PORT = process.env.PORT;

app.use("/api/v1/user",userRoute);

app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`)
    connectDB();
});