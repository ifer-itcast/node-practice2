const formidable = require('formidable');
const path = require('path');
const {Article} = require('../../model/article');

module.exports = (req, res) => {
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 保留上传文件后缀
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        // files.cover.path.split('public')[1]
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        });
        // 这里处理传递过来的数据，处理完毕后无需 render，直接 redirect
        res.redirect('/admin/article');
    });
};