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

//Create
postSchema.statics.create = function (payload) {
    const post = new this(payload);

    return post.save();
}

//Read
postSchema.statics.findOne = function (email, password) {
    return this.findOne({"email" : email, "password" : password});
}

//Update
postSchema.statics.updateById = function (id, payload) {
    return this.findOneAndUpdate({"id" : id}, payload, {new: true});    
}

//Delete
postSchema.statics.deleteById = function (id) {
    return this.deleteOne({ "id" : id });
}

module.exports = mongoose.model('post', postSchema);