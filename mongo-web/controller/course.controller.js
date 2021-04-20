let Course = require('../model/course.model.js');

let getCourseDetails = (req,res) => {
  Course.find({}, (err,result) => {
    (!err)? res.json(result) : err;
  });
}

let addCourseDetails = (req,res) => {
  let course = new Course({
      _id: req.body.cid,
      name: req.body.cname,
      description: req.body.desc,
      amount: req.body.amt
  });
  course.save( (err,result) => {
    (!err)? res.send(`successfully saved: ${result}`) : res.send(`failed to save: ${err}`);
  });
}

let deleteCourseById = (req,res) => {
  let cid = req.params.cid;
  console.log(cid)
  Course.deleteOne({_id:cid}, (err,result) => {
    if(!err){
      if(result.deletedCount){
        res.send("Course deleted successfully")
      } else {
        res.send("Course not present");
      }
    } else {
      res.send("Error: " + err);
    }
  })
}

let updateCourseDetails = (req,res) => {
  let cid = req.body.cid;
  let amt = req.body.amt;
  Course.updateMany({_id:cid}, {$set:{amount:amt}}, (err,result) => {
    if(!err){
      if(result.nModified){
        res.send("Course updated succesfully");
      } else {
        res.send("Course is not available");
      }
    } else {
      res.send("Error: " + err);
    }
  });
}

module.exports = {
  getCourseDetails,
  addCourseDetails,
  deleteCourseById,
  updateCourseDetails
}
