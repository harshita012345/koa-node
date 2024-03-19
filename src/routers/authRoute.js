const Router = require('koa-router');
const { createUserService, loginUserService } = require('../services/authService');

const router = new Router({
    prefix: '/auth'
});

router.post('/register', createUserService);
router.post('/login', loginUserService);

module.exports = router;