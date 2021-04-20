const express = require("express");
const router = express.Router();  //router reference. 
const controller = require("../controller/course.controller.js");

//mapping sub path with http methods. 
router.get("/getCourseDetails", controller.getCourseDetails);
router.post("/addCourseDetails", controller.addCourseDetails);
router.delete("/deleteCourseById/:cid", controller.deleteCourseById);
router.put("/updateCourseDetails", controller.updateCourseDetails);

module.exports = router;