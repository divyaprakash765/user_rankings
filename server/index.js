import express from "express"
import dotenv from "dotenv"
import connectDB from "./utils/connectDb.js";
import cors from "cors";
import userRoute from "./routes/UserRoute.js";
import path from "path";

const app = express();
dotenv.config({});

const _dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const corsOptions = {
    origin:'https://user-rankings.onrender.com',
    credentials:true
}

app.use(cors(corsOptions));
const PORT = process.env.PORT;

app.use("/api/v1/user",userRoute);

app.use(express.static(path.join(_dirname,"/client/dist")));
app.get(/.*/,(_,res) => {
    res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
})

app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`)
    connectDB();
});