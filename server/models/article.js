const mongoose = require('mongoose');
const User = require('./user')
var Schema = mongoose.Schema;

/* Generate Model */
let ArticleSchema = new Schema({
    title : {
        type : String,
        required : [true, 'title required!']
    },
    content : {
        type : String,
        required : [true, 'title required!']
    },
    image : String,
    UserId : {type : Schema.Types.ObjectId, ref : 'User'}
    // someManyFkData : [{type : Schema.Types.ObjectId, ref : 'Member'}]
},{timestamps : true})

/* middlewares/hooks */

/* 
ArticleSchema.pre('save', function(next){
    Article.findOne({ uniqueField : this.getUpdate().uniqueField })
    .then(data => {
        if(data){
            next({status : 500, message : 'this uniqueField has been used!'})
        }
        else {
            next()
        }
    })
}) */

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article