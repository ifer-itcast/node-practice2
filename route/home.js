const express = require('express');
const home = express.Router();

home.get('/', require('./home/index'));
home.get('/article', require('./home/article'));

// 评论功能
home.post('/comment', require('./home/comment'));

module.exports = home;