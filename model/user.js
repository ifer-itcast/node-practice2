const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    User
};