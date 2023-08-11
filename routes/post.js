const router = require('express').Router();
const imageUploader = require('../config/s3_config');
const Post = require("../models/post");

//게시글 생성
router.post('/create', (req, res) => {
    const {title, author, password, email, explain, content} = req.body;
    Post.create({title, author, email, explain, content})
        .then((response) => {
            res.status(200).json({"message" : "ok!"});
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})

//게시글 읽기
router.post("/", async(req, res) => {
    const { email, password } = req.body;
    Post.findOne(email, password)
        .then((response) => {
            if(!response) return res.status(404).json({ err: 'Post not found' });
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})

//게시글 수정

//게시글 삭제
router.delete('/')



router.post('/image', imageUploader.single('image'), (req,res) => {
    const filePath = req.file.location; 

    if(!filePath) {
        throw new CustomError({
            status: 401,
            response: {
                message: 'Invalid file path'
            }
        })
    }

    res.status(200).send({"path":filePath});
});


module.exports = router;