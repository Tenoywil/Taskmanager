const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

//connect Database
connectDB();

//Initialise Middleware
app.use(express.json({ extended: false }));

app.use(helmet());
app.use(cors());

app.get("/", (req, res) => res.send("Backend running"));

//Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/task", require("./routes/api/task"));

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
