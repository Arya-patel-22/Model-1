const express = require("express");
const cors = require("cors");
const connectDB = require("./db/config");
const User = require("./models/User");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        const user = new User(req.body);

        await user.save();

        res.status(201).json({
            message: "User Registered Successfully"
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});