const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());


app.use(express.static(path.join(__dirname, "frontend")));


app.use("/api/products", require("./routes/productRoutes"));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(5000, () => {
  console.log("Server running on port 5000 🔥");
  console.log("Frontend available at http://localhost:5000");
});