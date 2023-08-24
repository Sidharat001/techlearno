var express = require('express');
var categoryModule = require('../module/categorymodule');
var uuid = require("uuid");


class CategoryDetails {

    async CategorySaveData(data, cb) {
        try {
            let Category = {};
            Category.U_ID_Feedback = uuid.v4().replace("-", "").substring(0, 12);
            Category.Title = data.title;
            Category.Description = data.description;
            Category.Seo_Title = data.seotitle;
            Category.Seo_Description = data.seoDescription;
            Category.Seo_url = data.seoCategoryURL;
            Category.Visibility = data.visibility;
            Category.VisibilityDate = data.visibilitydate;

            let CategoryModel = new categoryModule(Category);
            await CategoryModel.save();

            return cb({ Status: "suc", Msg: "Category saved successfully" });
        } catch (error) {
            return cb({ Status: "err", Msg: "Error While Saving Data" });
        }
    }


    // Find all Category 
    async CategoryFinddata(cb) {
        await categoryModule.find({}, (err, User) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error checking  Data", data: err });
            } else if (User == null) {
                return cb({ Status: "err", Msg: "No data is there", data: err });
            } else {
                return cb({ Status: "suc", Msg: "User found", data: User });
            }
        }).clone().catch(function(err) { console.log(err) });
    }

    // Delete Category 
    async DeletePageURL(PageUrl, cb) {
        try {
            const CategoryrowDelet = await categoryModule.deleteOne({ Seo_url: PageUrl }); // Data Based Deleted Name First And Sec ond Variblel
            if (CategoryrowDelet.deletedCount === 1) {
                cb({ Status: "suc", Msg: "MetaTag deleted successfully" });
            } else {
                cb({ Status: "err", Msg: "MetaTag not found or not deleted" });
            }
        } catch (error) {
            console.log(error)
            cb({ Status: "err", Msg: "Error while deleting MetaTag" });
        }
    }

    // Find all blog data
    async find_Page_by_Url(URL, cb) {
        await blogModule.findOne({ Seo_url: URL }, (err, Category) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error checking  Data", data: err });
            } else if (Category == null) {
                return cb({ Status: "err", Msg: "No data is there", data: err });
            } else {
                return cb({ Status: "suc", Msg: "User found", data: Category });
            }
        }).clone().catch(function(err) { console.log(err) });
    }



}


module.exports = CategoryDetails;