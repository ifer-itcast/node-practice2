const {User} = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const {email, password} = req.body;
    if(email.trim().length === 0 || password.trim().length === 0) {
        // return res.status(400).send('<h4>邮件地址或密码错误</h4>');
        return res.status(400).render('admin/error', {
            msg: '邮件地址或密码错误'
        });
    }

    const user = await User.findOne({email});
    if(user) { // 能查到邮箱
        // 客户端传递过来的密码和 user.password 进行比对
        let isValid = await bcrypt.compare(password, user.password);
        if(isValid) {
            // 存储用户名到请求对象中
            req.session.username = user.username;
            // res.send('登录成功');
            
            // 把用户信息暴露到全局，各个模板都能取到 userInfo
            req.app.locals.userInfo = user;
            
            // 重定向，代替 res.writeHead(301, {Location: '/admin/user'})
            res.redirect('/admin/user');
        } else {
            res.status(400).render('admin/error', {
                msg: '邮箱地址或密码错误'
            });
        }
    } else { // 不能查到邮箱
        res.status(400).render('admin/error', {
            msg: '邮箱地址或密码错误'
        });
    }
}