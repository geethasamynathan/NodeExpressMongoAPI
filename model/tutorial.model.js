const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let tutorialSchema = new Schema(
  {    
    id:{type:Number},
    title: {type: String,},
    description: {type: String,}
      },
  {collection: "tutorials1",},
);

module.exports = mongoose.model("TutorialSchema", tutorialSchema);