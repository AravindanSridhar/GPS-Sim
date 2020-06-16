const express = require("express");
const path = require("path");
const chalk = require("chalk");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const debug = require("debug")("server");

debug(chalk.redBright("===> Starting server in debug mode."));

//Server Initialization
var server = express();

//Server Port specification
server.set("port", process.env.PORT || 3000);

//==Middlewares==

//Body Parser
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//Static Files
server.use(express.static(path.join(__dirname, "/public")));

//EJS View engine
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "/views"));

//Morgan logger
server.use(morgan("tiny"));

const dashboardRouter = require("./routes/dashboard");
server.use("/", dashboardRouter);

server.listen(server.get("port"), function () {
  console.log(
    "GPS-Sim Server started at : " +
      Date() +
      " at port : " +
      chalk.greenBright(server.get("port"))
  );
});
