const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

aws.config.update({
    region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_S3_ACCESS,
    secretAccessKey: process.env.AWS_S3_SECRET,
})
const s3 = new aws.S3();

const allowedExtensions = ['.png', '.jpg', '.jpeg', 'bmp'];

const imageUploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'likelion-helper',
        key: (req, file, callback) => {
            const uploadDirectory= req.query.directory ?? '';
            const extension = path.extname(file.originalname);
            if(!allowedExtensions.includes(extension)) {
                return callback(new Error('wrong extension'));
            }
            callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`)
        },
        acl: 'public-read-write'
    }),
})

module.exports = imageUploader;