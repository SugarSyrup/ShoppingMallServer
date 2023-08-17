const router = require('express').Router();
const Lecture = require("../models/lecture");

router.post('/create', (req, res) => {
    const {title, link, lecture} = req.body;
    Lecture.create({title, link, lecture})
        .then((response) => {
            res.status(200).json({"message" : "ok!"});
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})

// router.post('/search', (req, res) => {
//     const {text} = req.body;

//     Lecture.find()
//         .find({
//             title: {regex:}
//         })
//         .then((response) => {
//             console.log(response);
//             res.status(200).json({"data" : response});
//         })
//         .catch((err) => {
//             res.status(500).json(err);
//         })
// })

module.exports = router;