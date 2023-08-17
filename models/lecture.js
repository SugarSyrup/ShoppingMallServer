const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    lecture: {type: String},
    title: {type: String, required:true},
    link : {type:String, required:true },
}
);

//생성
lectureSchema.statics.create = function (payload) {
    const lecture = new this(payload);

    return lecture.save();
}

//모든 강좌 찾기 (tag별로 분배하기?)


//강좌 검색하기
module.exports = mongoose.model('lecture', lectureSchema);