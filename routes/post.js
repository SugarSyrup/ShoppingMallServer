const router = require('express').Router();
const imageUploader = require('../config/s3_config');

router.post('/test/image', imageUploader.single('image'), (req,res) => {
    const filePath = req.file.location; //업로드된 이미지 경로
    if(!filePath) {
        throw new CustomError({
            status: 401,
            response: {
                message: 'Invalid file path'
            }
        })
    }
    res.status(200).send(filePath);
})


module.exports = router;