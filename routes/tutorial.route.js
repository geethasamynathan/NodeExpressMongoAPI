const express = require("express");
const tutorialExpressRoute = express.Router();
const cors = require("cors");
let TutorialSchema = require("../model/tutorial.model");
// CORS OPTIONS
var whitelist =[];
// ["https://localhost:8100", "https://localhost:4000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    console.log(whitelist[0]);
    corsOptions = {
      origin: "https://localhost:4000",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    };
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions);
};
// Get users
tutorialExpressRoute
  .route("/", cors(corsOptionsDelegate))
  .get(async (req, res, next) => {
    await TutorialSchema.find()
      .then((result) => {
       // console.log(result);
        res.json({
          data: result,
          // message: "Data successfully fetched!",
          // status: 200,
        });
      })
      .catch((err) => {
        return next(err);
      });
  });
// Create user/create-student
tutorialExpressRoute.route("/add-tutorial")
.post(async (req, res, next) => {
  await TutorialSchema.create(req.body)
    .then((result) => {   
      res.json({
        data: result ,
         message: "Data successfully added.",
         status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});
// Get single user
tutorialExpressRoute.route("/get-tutorial/:id")
.get(async (req, res, next) => {
  await TutorialSchema.findById(req.params.id, req.body)
 
    .then((result) => {
      res.json({
         data: result,
        message: "Data successfully retrieved.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});
// Update user
tutorialExpressRoute.route("/update-tutorial/:id")
.put(async (req, res, next) => {
  await TutorialSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((result) => {
      res.json({
        data: result,
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      return next(err);
    });
});
// Delete student
tutorialExpressRoute.route("/remove-tutorial/:id")
.delete(async (req, res) => {
  
  await TutorialSchema.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        msg: "Data successfully removed.",
      });
    })
    .catch((err) => {
      return next(err);
    });

    
});
module.exports =tutorialExpressRoute;