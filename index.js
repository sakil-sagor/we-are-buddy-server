const express = require('express');
const { chats } = require('./data/data');
const dotenv = require("dotenv");
const connectDB = require('./config/db')
const userRoutes = require("./Routes/userRoutes");
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const chatRoutes = require("./Routes/chatRoutes")
const messageRoutes = require("./Routes/messageRoutes")

dotenv.config();
connectDB();
const app = express();



// middleware
var cors = require('cors');
app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
    res.send("welcome to home page.")
})


app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/message", messageRoutes)
// error handle 
app.use(notFound)
app.use(errorHandler)



const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})


