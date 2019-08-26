const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱唯一
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        // 0 代表启用状态
        default: 0
    }
});

const User = mongoose.model('User', userSchema);

const validateUser = user => {
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email: Joi.string().email().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态非法'))
    };
    return Joi.validate(user, schema);
};

// async function createUser() {
//     const salt = await bcrypt.genSalt(10)
//     const pass = await bcrypt.hash('aaa', salt)
//     const user = await User.create({
//         username: 'aaa',
//         email: 'aaa@qq.com',
//         password: pass,
//         role: 'admin',
//         state: 0
//     });
// }
// createUser();


module.exports = {
    User,
    validateUser
};