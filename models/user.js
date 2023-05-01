const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {type: String, required:true, unique: true},
    password : {type: String, required:true},
    name : { type: String, required: true},
},
{
    timestamps: true
});

userSchema.statics.create = function (payload) {
    const user = new this(payload);

    return user.save();
}

userSchema.statics.findAll = function () {
    return this.find({});
}

userSchema.statics.findOneByUserid = function (userid) {
    return this.findOne({ "id" : userid });
}

userSchema.statics.updateByUserid = function (userid, payload) {
    return this.findOneAndUpdate({ "id" : userid }, payload, {new : true});
}

userSchema.statics.deleteByUserid = function (userid) {
    return this.deleteOne({ "id" : userid });
}

module.exports = mongoose.model('User', userSchema);