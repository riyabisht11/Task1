const express=require("express");


const dotenv=require("dotenv");
const connectDB = require("./connection");
const taskRoutes=require("./routes/taskRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();



app.use(express.json());

// Task 1
// app.get("/Server",(req,res)=>{
//     res.json({
//         message:"Server is running"
//     });
// });

app.use("/api",taskRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);

  let statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Bad Request: Invalid Input";
  } else if (err.name === "CastError") {
    statusCode = 404;
    message = "Not Found: Resource does not exist";
  }

  res.status(statusCode).json({ error: message });
});




app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
