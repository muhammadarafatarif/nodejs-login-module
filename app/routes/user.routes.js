const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/user.controller');

router.post("/login", UserCtrl.apiUserLogin);

module.exports = router;