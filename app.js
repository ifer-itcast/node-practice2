const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const template = require('art-template');
const dateFormat = require('dateformat');
template.defaults.imports.dateFormat = dateFormat;
require('./model/connect');

// extended 为 false，内部将使用 querystring 去处理，为 true 的话将使用第三方模块 qs 去处理
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({
    secret: 'xxx',
    // 是指每次请求都重新设置 session cookie，假设你的 cookie 是10分钟过期，每次请求都会再设置10分钟
    resave: false,
    // 无论有没有 session，每次请求都设置个默认的 connect.sid 到 cookie
    saveUninitialized: false,
    cookie: {
        // 毫秒单位，1 天失效
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// 1. 静态资源托管
app.use(express.static(path.join(__dirname, 'public')));
// 2. 配置模板引擎
app.set('views', path.join(__dirname, 'views')); // 2.1 模板位置
app.set('view engine', 'art'); // 2.2 模板默认后缀
app.engine('art', require('express-art-template')); // 2.3 用什么模板引擎渲染 art 文件


// 匹配以 /admin 开头的路径
app.use('/admin', require('./middleware/loginGuard'));

// 后台入口
app.use('/admin', require('./route/admin'));
// 前台入口
app.use('/home', require('./route/home'));

// 错误处理中间件
app.use((err, req, res, next) => {
    const result = JSON.parse(err);
    let params = [];
    for(let attr in result) {
        if(attr !== 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    // res.redirect(`${result.path}?message=${result.message}`);
    res.redirect(`${result.path}?${params.join('&')}`);
});

app.listen(3000, () => {
    console.log('服务启动成功');
});