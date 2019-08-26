const {User} = require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = async (req, res, next) => {
    const {username, email, role, state, password} = req.body;
    const id = req.query.id;

    const user = await User.findOne({_id: id});

    // 密码比对
    const isEqual = await bcrypt.compare(password, user.password);
    if(isEqual) {
        // 密码比对成功，允许修改内容，但不需要修改密码
        await User.updateOne({
            _id: id
        }, {
            username,
            email,
            role,
            state
        });
        // 重定向到用户列表
        res.redirect('/admin/user');
    } else {
        // 密码比对失败，触发错误处理中间件，注意要把当前用户的 id 带过去
        let obj = {path: '/admin/user-edit', message: '密码比对失败，不能修改', id};
        next(JSON.stringify(obj));
    }
};