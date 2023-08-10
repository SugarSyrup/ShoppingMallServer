const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    id: {type: String, required:true, unique: true},
    title: {type: String, required:true},
    author : {type: String, required:true},
    email : {type: String, required:true},
    content : { type: String, required: true},
},
{
    timestamps: true
});

postSchema.statics.create = function (payload) {
    const user = new this(payload);

    return user.save();
}

postSchema.statics.findAll = function () {
    return this.find({});
}

postSchema.statics.findOneByUserid = function (userid) {
    return this.findOne({ "id" : userid });
}

postSchema.statics.updateByUserid = function (userid, payload) {
    return this.findOneAndUpdate({ "id" : userid }, payload, {new : true});
}

postSchema.statics.deleteByUserid = function (userid) {
    return this.deleteOne({ "id" : userid });
}

module.exports = mongoose.model('post', postSchema);