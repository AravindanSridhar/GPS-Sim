const express = require("express");
const dashboardRouter = express.Router();
const debug = require("debug")("dasboard");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const fs = require("fs");
const csv = require("csv-parser");
const formidable = require("formidable");
const path = require("path");
const https = require("https");
const axios = require("axios");

//Body Parser
dashboardRouter.use(bodyParser.urlencoded({ extended: false }));
dashboardRouter.use(bodyParser.json());

dashboardRouter.get("/", function (req, res) {
  res.render("dashboard", {});
});

dashboardRouter.get("/parseTest", (req, res) => {
  var lat = [],
    long = [];
  fs.createReadStream("output.csv")
    .pipe(csv(["Latitude", "Longitude"]))
    .on("data", (row) => {
      lat.push(row["Latitude"]);
      long.push(row["Longitude"]);
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
      var index = 0;
      var timer = setInterval(doStuff, 3000);
      function doStuff() {
        ++j;
        if (j == lat.length) clearInterval(timer);
      }
      res.send("running");
    });
});

dashboardRouter.get("/startTrajectory", (req, res) => {
  var lat = [],
    long = [];

  fs.createReadStream("output.csv")
    .pipe(csv(["Latitude", "Longitude"]))
    .on("data", (row) => {
      lat.push(row["Latitude"]);
      long.push(row["Longitude"]);
    })
    .on("end", () => {
      console.log("CSV file successfully processed");

      // GPS update setup
      var interval = req.query.interval;
      var url = req.query.url;
      var index = 0;
      var timer = setInterval(doStuff, interval);

      // REST Call function
      function doStuff() {
        axios
          .post(url, {
            latitude: lat[index],
            longitude: long[index],
          })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        ++index;
        //Stop interval loop upon reaching data length
        if (index == lat.length) clearInterval(timer);
      }
      res.status(200).send("Trajectory simulation started.");
    });
});

// dashboardRouter.post("/api/gps", (req, res) => {
//   console.log("Tracking Server : " + req.body.latitude);
//   res.status(201).send({ status: "Updated!" });
// });

dashboardRouter.post("/uploadCSV", (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    //No file error handling
    if (files.trajectory == undefined) {
      res.status(400).send({ status: "failure", fileName: null });
    } else {
      var oldPath = files.trajectory.path;
      var newPath =
        path.join(__dirname, "../uploads") + "\\" + files.trajectory.name;
      var rawData = fs.readFileSync(oldPath);
      fs.writeFile(newPath, rawData, function (err) {
        if (err) {
          console.log(err);
          res.status(500).send({ error: "Problem uploading file." });
        }
        return res.status(201).send({
          status: "success",
          fileName: files.trajectory.name,
        });
      });
    }
  });
});

module.exports = dashboardRouter;
