const router = require('express').Router();
const User = require('../models/user');

//GET : ALL USERS
router.get('/', (req, res) => {
    User.findAll()
        .then((users) => {
            if(!users.length) return res.status(404).send({ err: 'User not found'});
            res.send(`find successfully: ${users}`);
        })
        .catch(err => res.status(500).send(err));
})

//GET : ONE USER INFO
router.get('/userid/:userid', (req, res) => {
    const {userid} = req.params
    User.findOneByUserid(userid)
      .then((user) => {
        if (!user) return res.status(404).json({ err: 'User not found' });
        res.status(200).json(`findOne successfully: ${user}`);
      })
      .catch(err => res.status(500).json(err));
});

//POST : 로그인
router.post('/login', async (req, res) => {
    const {id, password} = req.body;
    const exists = await User.findOne({id});
    if(exists) {
        const _user = await User.findOne({id, password});
        if(_user) {
            res.status(200).json({"name": user.name}); 
        }
        return res.status(400).json({ err: 'password is not matched'});
    } else {
        return res.status(400).json({ err: 'id is not exists'});
    }
});

//POST : 회원가입
router.post('/signup', async (req, res) => {
    const {id, password, name} = req.body;
    const exists = await User.exists({id});
    if(exists) {
        return res.status(400).json({ err: 'id is already exists'});
    } else {
        User.create({id, password, name})
            .then(user => res.status(200).json({"name": user.name}))
            .catch(err => res.status(500).json(err));
    }
});
  
//PUT : 비밀번호 수정
router.put('/userid/:userid', (req, res) => {
    const {userid} = req.params;
    const {new_password} = req.body
    User.updateByUserid(userid, {password : new_password})
      .then(user => res.status(200).send(user.name))
      .catch(err => res.status(500).send(err));
});
  
//DELETE : 유저정보 삭제
router.delete('/userid/:userid', (req, res) => {
    User.deleteByUserid(req.params.userid)
      .then((user) => res.status(200).send('delete success'))
      .catch(err => res.status(500).send(err));
});
  
module.exports = router;