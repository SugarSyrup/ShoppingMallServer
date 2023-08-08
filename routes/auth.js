const router = require('express').Router();
const {sens} = require('../config/sens_config');
const CryptoJS = require('crypto-js');
const axios = require('axios');

router.get('/phone', (req, res) => {
    return res.json({'msg' : 'message'})
})

router.post('/phone', async (req, res) => {
    try {
        const {phone_number} = req.body;
        const code = Math.floor(1000 + Math.random() * 9000) + "";
        const date = Date.noe().toString();

        //env
        const sens_service_id = sens.serviceId;
        const sens_access_key = sens.accessKey;
        const sens_secret_key = sens.secretKey;
        const sens_call_number = sens.callNumber;

        const method = "POST";
        const space = " ";
        const newLine = "\n";
        const url = `https://sens.apigw.ntruss.com/sms/v2/services/${sens_service_id}/messages`;
        const url2 = `/sms/v2/services/${sens_service_id}/messages`;

        const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, sens_secret_key);

        hmac.update(method);
        hmac.update(space);
        hmac.update(url2);
        hmac.update(newLine);
        hmac.update(date);
        hmac.update(newLine);
        hmac.update(sens_access_key);

        const hash = hmac.finalize();
        const signature = hash.toString(CryptoJS.enc.Base64);

        const smsRes = await axios({
            method: method,
            url: url,
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "x-ncp-iam-access-key": sens_access_key,
                "x-ncp-apigw-timestamp": date
                ,
                "x-ncp-apigw-signature-v2": signature,
              },
              data: {
                type: "SMS",
                countryCode: "82",
                from: sens_call_number,
                content: `인증번호는 [${verificationCode}] 입니다.`,
                messages: [{ to: `${phone_number}` }],
              },
            });
            console.log(smsRes.data);
            return res.status(200).json({ message: "SMS sent", code: code });
    } catch (err) {
        return res.status(404).json({ message: "SMS not sent"})
    }
})

module.exports = router;