const router = require('express').Router();
const imageUploader = require('../config/s3_config');
const Post = require("../models/post");
const ObjectId = require('mongodb').ObjectId;

//게시글 생성 (ok)
router.post('/create', (req, res) => {
    const {title, author, password, email, explain, content} = req.body;
    Post.create({title, author, password, email, explain, content})
        .then((response) => {
            res.status(200).json({"message" : "ok!"});
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})

//게시글 읽기 (해당 유저가 작성한 게시물들)
router.post("/getPosts", async(req, res) => {
    const { email, password } = req.body;
    Post.find({
        email: email,
        password: password
    })
        .then((response) => {
            if(!response) return res.status(404).json({ err: 'Post not found' });
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})

//단일 게시물 정보 가져오기
//id를 통해서 접근 완료
router.post("/getPost", async(req, res) => {
    const { id } = req.body;
    
    Post.findOne({
        _id : id
    })
        .then((response) => {
            if(!response) return res.status(404).json({ err: 'Post not found' });
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})

//게시글 수정
router.put('/', async(req,res) => {
    const { id } = req.body;
    const {title, author, password, email, explain, content} = req.body;

    Post.updateById(id, {
        title, author, password, email, explain, content
    })
        .then((response) => {
            res.status(200).json({"message" : "ok!"});
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})


//게시글 삭제
router.delete('/', async(req, res) => {
    const {id} = req.body;

    Post.deleteById(id)
        .then((response) => {
            res.status(200).json({"message" : "ok!"});
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})



//이미지 등록
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