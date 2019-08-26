module.exports = (req, res) => {
    // 删除 session
    req.session.destroy(function() {});
    // 删除 cookie
    res.clearCookie('connect.sid');
    // 重定向到登录页面
    res.redirect('/admin/login');
};