const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
<<<<<<< HEAD
const routers = require("./route/route")
=======
const routers = require("./routes/route")
const connectDB = require('./config/database');


connectDB();
>>>>>>> duc

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true, 
  })
);
 
<<<<<<< HEAD
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });
=======
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("Connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
>>>>>>> duc

app.use("/api/", routers);

const server = app.listen(port, () => {
<<<<<<< HEAD
  console.log(`Server running at http://localhost:${port}/`);
});

=======
  console.log(`Server running at http://localhost:${port}`);
});
>>>>>>> duc
