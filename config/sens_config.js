const dotenv = require('dotenv');
const axios = require('axios');
const CryptoJS = require('crypto-js');
dotenv.config();

function send_message(phone) {
    const user_phone_number = phone;
    console.log("123");
    console.log(user_phone_number);

    const finErrCode = 404;
    const date = Date.now().toString();
    const code = Math.floor(1000 + Math.random() * 9000) + "";
    
    // 환경변수로 저장했던 중요한 정보들
    const serviceId = process.env.NCP_SENS_ID; 
    const secretKey = process.env.NCP_SENS_SECRET;
    const accessKey = process.env.NCP_SENS_ACCESS;
    const my_number = process.env.NCP_SENS_MYNUM;
    
    // 그 외 url 관련
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
    const url2 = `/sms/v2/services/${serviceId}/messages`;

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);

    axios({
        method: method,
        // request는 uri였지만 axios는 url이다
        url: url,
        headers: {
            "Contenc-type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": accessKey,
            "x-ncp-apigw-timestamp": date,
            "x-ncp-apigw-signature-v2": signature,
        },
        // request는 body였지만 axios는 data다
        data: {
            type: "SMS",
            countryCode: "82",
            from: my_number,
            // 원하는 메세지 내용
            content: `[Helper] 본인 인증 코드 : ${code}`,
            messages: [
            // 신청자의 전화번호
                { to: `${user_phone_number}` }
            ],
        },
    }).then(res => {
        return {
            ok: true,
            code: code
        }
    })
        .catch(err => {
            console.log(err);
            return {
                ok: false
            }
        })
}

module.exports = send_message;