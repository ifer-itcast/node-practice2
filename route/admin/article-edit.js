module.exports = (req, res) => {
    // mark
    req.app.locals.currentLink = 'article-edit';
    res.render('admin/article-edit');
};