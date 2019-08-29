const {Article} = require('../../model/article');
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    const page = req.query.page;
    // let result = await Article.find().populate('author');
    // display 客户端显示多少个页码，大于总页码只显示总的
    // exec
    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
    res.render('home/default', {
        result
    });
};