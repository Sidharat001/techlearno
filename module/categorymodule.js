const mongooes = require('mongoose');
var uuid = require("uuid");
var bodyParser = require('body-parser');

var CategorySchema = new mongooes.Schema({
    U_ID_Feedback: {
        type: String,
        default: uuid.v4().replace("-", "").substring(0, 12),
        unique: true,
        required: [true, "ID can't be blank"],
        index: true
    },
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String
    },
    Seo_Title: {
        type: String
    },
    Seo_Description: {
        type: String
    },
    Seo_url: {
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
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Category = mongooes.model('Category', CategorySchema);