const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    title: {type: String, required:true},
    explain : {type:String },
    tags: [String],
    practice : Boolean,
},
{
    timestamps: true
});

//단일 강좌 찾기
lectureSchema.statics.findOne = function (email, password) {
    return this.findOne({"email" : email, "password" : password});
}

//모든 강좌 찾기 (tag별로 분배하기?)


//강좌 검색하기

module.exports = mongoose.model('lecture', lectureSchema);