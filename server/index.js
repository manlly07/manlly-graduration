const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const routers = require("./routes")
const connectDB = require('./config/database');


connectDB();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true, 
  })
);
 
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("Connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.use(routers);

// error handling
app.use(function(err, req, res, next){

  const message = err.raw?.message || err.message || err.sqlMessage || null;

  console.error(err);
  log.create({ message: message, body: err, req: req });
  
  return res.status(500).send({ message: message });

});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});