module.exports = (req, res, next) => {
    // http://localhost:3000/admin/user
    // 不是登录页面 并且 没有登录
    if(req.url !== '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        // 访问的是登录页面，放行！
        // 要么就是已经登录了，放行！
        if(req.session.role === 'normal') {
            return res.redirect('/home');
        } else {
            next();
        }
    }
}