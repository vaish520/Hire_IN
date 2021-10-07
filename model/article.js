const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createdompurify = require('dompurify')
const {JSDOM} = require('jsdom')
const dompurify = createdompurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    title:{ type: String , required: true},
    description:{type : String},
    markdown : {type:String, required: true},
    createdAt: { type: Date, required: true},
    slug: { type: String, required: true, unique: true},
    sanitizedHtml:{ type: String, required: true}

})

articleSchema.pre('validate', function(next){
    if(this.title){
        this.slug = slugify(this.title, { lower: true, strict:true})
    }

    if(this.markdown){
        this.sanitizedHtml = dompurify.santize(marked(this.markdown))
    }
    next()
})

module.exports =mongoose.model('Article', articleSchema);