var express = require('express');
var router = express.Router();

// Controller
var CategoryControllers = require("../../controllers/categorycontroller")
var UserVerification = require("../../middleware/userverification.js");

// Object
var category = new CategoryControllers();
var userverification = new UserVerification();


// List Category 
router.get(["/category", "/category", "/category"], userverification.checkcookie, async(req, res) => {
    await category.CategoryFinddata((cb) => {
        return res.status(200).render("../views/admin/category/category.ejs", { title: "Category  - TaxManager.In", Data: cb.data });
    });
});


// Add Category 
router.get(["/add-category", "/add_category", "/add category"], userverification.checkcookie, async(req, res) => {
    return res.status(200).render("../views/admin/category/add-category.ejs", {
        title: "Add Category  - TaxManager.In"
    });
});


// Add Category  Post
router.post('/SaveCategory', userverification.checkcookie, async(req, res) => {
    await category.CategorySaveData(req.body, (cb) => {
        if (cb.Status === 'suc') {
            req.flash("success", cb.Msg)
            res.status(200).redirect("/admin/category/category");
        } else {
            req.flash("error", cb.Msg)
            res.status(404).redirect("/admin/category/add-category")
        }
    })
});


// Delete Category
router.get(["/delete/:Seo_url"], userverification.checkcookie, async(req, res) => {
    const PageURL = req.params.Seo_url;
    category.DeletePageURL(PageURL, (cb) => {
        if (cb.Status === 'suc') {
            req.flash("success", cb.Msg);
            res.status(200).redirect("/admin/category/category");
        } else {
            req.flash("error", cb.Msg);
        }
    });
});


// Edit blog post
router.get("/edit/:Seo_url", userverification.checkcookie, async(req, res) => {
    const PageURL_Id = req.params.Seo_url;
    category.find_Page_by_Url(PageURL_Id, (cb) => {
        if (cb.Status === 'suc') {
            req.flash("success", cb.Msg);
            return res.status(200).render("../views/admin/category/edit-category.ejs", { title: "Edit Category", Data: cb.data });
        } else {
            req.flash("error", cb.Msg);
        }

    });
});




module.exports = router;