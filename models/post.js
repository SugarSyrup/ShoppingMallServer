const mongoose = require('mongoose');

const contentSchema = {
    text: String,
    img: String
}

const postSchema = new mongoose.Schema({
    title: {type: String, required:true},
    author : {type: String, required:true},
    email : {type: String, required:true},
    password: {type: String, required:true},
    explain : {type:String, required:true},
    content : [contentSchema],
},
{
    timestamps: true
});

//생성
postSchema.statics.create = function (payload) {
    const post = new this(payload);

    return post.save();
}

//수정
postSchema.statics.updateById = function (id, payload) {
    return this.findOneAndUpdate({"_id" : id}, payload, {new: true});    
}

//Delete
postSchema.statics.deleteById = function (id) {
    return this.deleteOne({ "_id" : id });
}

module.exports = mongoose.model('post', postSchema);