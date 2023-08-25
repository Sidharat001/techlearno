var express = require('express');
const CoursesModel = require('../module/coursesmodule');
const CategoryModel = require('../module/categorymodule');
var uuid = require("uuid");


class CoursesDetails {

    // save Courses post
    async SaveCoursesData(req, data, cb) {
        try {
            // const requestData = req.body;

            let Courses = {};

            Courses.U_ID_Feedback = uuid.v4().replace("-", "").substring(0, 12);
            Courses.Title = data.title;
            Courses.Description = data.description;
            Courses.ClassesSchedule = data.classes_schedule;
            Courses.Price = data.price;

            Courses.Course_Curriculum_Title = data.course_curriculum_title;
            Courses.Course_Curriculum_Description = data.course_curriculum_description;
            Courses.Faqs_Title = data.faqs_title;
            Courses.Faqs_Description = data.faqs_description;
            Courses.Certification_Title = data.certification_title;
            Courses.Certification_Description = data.certification_description;

            Courses.Seo_Title = data.seotitle;
            Courses.Seo_Description = data.seoDescription;
            Courses.Seo_URL = data.seoCategoryURL;
            Courses.Visibility = data.visibility;
            Courses.Select_Catgeory = data.selectcatgeory;
            Courses.VisibilityDate = data.visibilitydate;
            Courses.Featuredimage = data.featuredImage;


            console.log(Courses)
            let result = new CoursesModel(Courses);
            await result.save();
            cb({ Status: "suc", Msg: "Courses post saved successfully" });


        } catch (error) {
            console.error("Error saving data:", error);
            return cb({ Status: "err", Msg: "Error While Saving Data" });
        }
    }

    // Find all Category 
    async CoursesFinddata(cb) {
        await CoursesModel.find({}, (err, Courses) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error checking  Data", data: err });
            } else if (Courses == null) {
                return cb({ Status: "err", Msg: "No data is there", data: err });
            } else {
                return cb({ Status: "suc", Msg: " Courses found", data: Courses });
            }
        }).clone().catch(function (err) { console.log(err) });
    }

    // Deleted
    async DeletCoursesdata(Coursesurl, cb) {
        try {
            const result = await CoursesModel.deleteOne({ Seo_url: Coursesurl });
            if (result.deletedCount === 1) {
                return cb({ Status: "suc", Msg: "Blog post deleted successfully" });
            } else {
                return cb({ Status: "err", Msg: "Blog post not found or not deleted" });
            }
        } catch (error) {
            return cb({ Status: "err", Msg: "Error while deleting blog post" });
        }
    }

    // Find Blog Details
    async CategoryFinddata(Seo_url_details_data, cb) {
        try {
            const CoursesDetails = await CoursesModel.find();
            const data = CoursesDetails.filter(item => item.Select_Catgeory === Seo_url_details_data);
            if (data.length < 1) {
                return cb({ Status: "suc", Msg: "Data Not Found", data: [] });
            }
            return cb({ Status: "suc", Msg: "User found", data: data });
        } catch (err) {
            console.error("Error Views Blog Data data:", err);
            return cb({ Status: "err", Msg: "Error Views Blogs data" });
        }
    }

    async getCourseDetails(Seo_url_details_data, cb) {
        try {
            const CoursesDetails = await CoursesModel.find();
            const data = CoursesDetails.filter(item => item.Seo_URL === Seo_url_details_data);
            if (data.length < 1) {
                return cb({ Status: "Failed", Msg: "Data Not Found", data: data });
            }
            return cb({ Status: "suc", Msg: "User found", data: data });
        } catch (err) {
            console.error("Error Views Blog Data data:", err);
            return cb({ Status: "err", Msg: "Error Views Blogs data" });
        }
    }
}

module.exports = CoursesDetails;