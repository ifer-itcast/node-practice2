const bcrypt = require('bcrypt');
const {User, validateUser} = require('../../model/user');
module.exports = async (req, res, next) => {
    try {
        await validateUser(req.body);
    } catch(e) {
        // 重定向到用户添加页面
        // return res.redirect(`/admin/user-edit?message=${e.message}`);
        // {path: '/admin/user-edit', message: e.message}
        return next(JSON.stringify({path: '/admin/user-edit', message: e.message}));
    }

    // 通过验证规则后，验证邮箱是否已注册
    let user = await User.findOne({email: req.body.email});
    if(user) {
        // 邮箱已存在
        // return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用了`);
        return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱地址已经被占用了'}));
    }

    // 加密密码
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    req.body.password = password;
    // 将用户信息添加到数据库
    await User.create(req.body);
    res.redirect('/admin/user');
};