const {User} = require('../../model/user');

module.exports = async (req, res) => {
    // 用户管理页面
    req.app.locals.currentLink = 'user';
    
    // 接收客户端传过来的当前页参数
    // localhost/admin/user?page=2
    let page = req.query.page || 1;
    // 每一页显示的数据条数
    let pagesize = 3;
    // 总条数
    let count = await User.countDocuments({})
    // 总页数
    let total = Math.ceil(count/pagesize);

    // 数据的开始位置（需要跳过的数量） = （当前页-1）* 每页显示的数据条数
    let start = (page - 1) * pagesize;
    let users = await User.find().limit(pagesize).skip(start);
    res.render('admin/user', {
        users,
        page,
        total
    });
};