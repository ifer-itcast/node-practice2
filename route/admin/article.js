const {Article} = require('../../model/article');
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    const page = req.query.page || 1;

    req.app.locals.currentLink = 'article';

    // let articles = await Article.find().populate('author');
    // page, 当前页
    // size, 每页显示多少条
    // display, 客户端要显示的页码数量
    // exec, 查询
    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();
    res.render('admin/article', {
        articles
    });
};