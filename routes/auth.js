const router = require('express').Router();
const send_message = require('../config/sens_config');

router.get('/phone', (req, res) => {
    return res.json({'msg' : 'message'})
})

router.post('/phone', async (req, res) => {
    const phone = req.body.phone;
    res.setHeader('Content-Type', 'application/json')

    console.log('post is work')
    try {
        const result = await send_message(phone);
        res.status(200).json({"message" : "send ok!", "code":result.code})
    }catch(err){
        console.log(err)
    }
})

module.exports = router;