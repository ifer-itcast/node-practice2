const mongoose = require('mongoose');
const config = require('config');

mongoose.set('useCreateIndex', true);

// mongodb://ifer:ifer@localhost/test3
// mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, {
    useNewUrlParser: true
}).then(res => {
    console.log('数据库链接成功');
}).catch(err => {
    console.log('数据库链接失败');
});