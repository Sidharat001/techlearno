var express = require('express');
var router = express.Router();
var mongooe = require('mongoose');
var bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');
const multer = require('multer')
const uuid = require('uuid');


// Controller
var coursesControllers = require("../../controllers/coursescontroller")
var UserVerification = require("../../middleware/userverification.js");
var CategoryControllers = require("../../controllers/categorycontroller")

// Object
var courses = new coursesControllers();
var userverification = new UserVerification();
var category = new CategoryControllers();


// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const yearMonth = new Date().toISOString().substring(0, 7); // Year-Month folder
        const uploadPath = path.join(__dirname, '..', 'public', 'uploads', yearMonth);

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, {
                recursive: true
            });
        }

        cb(null, uploadPath);
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({
    storage: storage
});



// List courses 
router.get(["/courses", "/Courses"], userverification.checkcookie, async(req, res) => {
    await courses.CoursesFinddata((cb) => {
        return res.status(200).render("../views/admin/courses/courses.ejs", { title: "Courses  - Techlearno.com", Data: cb.data });
    });
});


// Save courses Post
router.post('/SaveCourses', upload.array("featuredImage"), userverification.checkcookie, async (req, res) => {
     courses.SaveCoursesData(req, req.body, (cb) => {
        if (cb.Status === 'suc') {
            req.flash("success", cb.Msg);
            res.status(200).redirect("/admin/courses/courses");
        } else {
            req.flash("error", cb.Msg);
            res.status(404).redirect("/admin/courses/add-courses");
        }
    });
});


// Delete Category
router.get(["/delete/:Seo_url"], userverification.checkcookie, async(req, res) => {
    const PageURL = req.params.Seo_url;
     courses.DeletCoursesdata(PageURL, (cb) => {
        if (cb.Status === 'suc') {
            req.flash("success", cb.Msg);
            res.status(200).redirect("/admin/courses/courses");
        } else {
            req.flash("error", cb.Msg);
        }
    });
});

// Add courses
router.get(["/add-courses", "/add_courses", "/add courses", "addcourses"], userverification.checkcookie, async(req, res) => {
    await category.CategoryFinddata((cb) => {
        return res.status(200).render("../views/admin/courses/add-courses.ejs", { title: "Add Courses  - TaxManager.In", Data: cb.data });
    });
   
});


module.exports = router;