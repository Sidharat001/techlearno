// courses module
const mongoose = require('mongoose');
const uuid = require("uuid");
const Schema = mongoose.Schema;
const CoursesSchema = new Schema({
    U_ID_Feedback: {
        type: String,
        default: uuid.v4().replace("-", "").substring(0, 12),
        unique: true,
        required: [true, "ID can't be blank"],
        index: true
    },
    Title: {
        type: String
    },
    Description: {
        type: String
    },
    ClassesSchedule: {
        type: String
    },
    Price: {
        type: String
    },
    Course_Curriculum_Title: {
        type: String
    },
    Course_Curriculum_Description: {
        type: String
    },
    Faqs_Title: {
        type: String
    },
    Faqs_Description: {
        type: String
    },
    Certification_Title: {
        type: String
    },
    Certification_Description: {
        type: String
    },
    Seo_Title: {
        type: String
    },
    Seo_Description: {
        type: String
    },
    Seo_URL: {
        type: String
    },
    Select_Catgeory: {
        type: String
    },
    Visibility: {
        type: String,
        enum: ['public', 'private', 'draft'],
        default: 'public'
    },
    VisibilityDate: {
        type: Date,
        default: null
    }, 
    Featuredimage: {
        type: String
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

const CoursesModel = mongoose.model('Courses', CoursesSchema);

// async function SaveCoursesData(data, cb) {
//     try {
//         const CoursesModel = new Courses(data); // Assuming data is a valid object with course details
//         await CoursesModel.save();
//         cb({ Status: "suc", Msg: "Courses post saved successfully" });
//     } catch (error) {
//         console.error("Error saving data:", error);
//         cb({ Status: "err", Msg: "Error While Saving Data" });
//     }
// }

module.exports = CoursesModel