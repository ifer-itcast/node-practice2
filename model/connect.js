const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost/test3', {
    useNewUrlParser: true
}).then(res => {
    console.log('数据库链接成功');
}).catch(err => {
    console.log('数据库链接失败');
});