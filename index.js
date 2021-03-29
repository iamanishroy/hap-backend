// require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");

const fetchBatches = require("./functions/fetchBatches");
const fetchTimeTable = require("./functions/fetchTimeTable");
var app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const port = process.env.PORT || 9000;

// var allowlist = process.env.SITES.split(",");
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header("Origin")) !== -1) {
//     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false }; // disable CORS for this request
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };

app.use(bodyParser.json());
// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.send("this is a CORS enabled API for Time Table");
});
app.post("/batch", (req, res) => {
  fetchBatches()
    .then((batches) => {
      res.status(200).json(batches);
    })
    .catch((er) => {});
});

app.post("/timetable", (req, res) => {
  var data = req.body;
  fetchTimeTable(
    data.data.day,
    data.data.month,
    data.data.year,
    data.data.batchID
  )
    .then((timetable) => {
      res.status(200).json(timetable);
    })
    .catch((er) => {});
});

app.listen(port);
