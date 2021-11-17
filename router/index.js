const router = require('express').Router();
const Controller = require('../controllers/controller');
const adminRouter = require('./admin');
const userRouter = require('./user');

router.get('/', Controller.loginPage)
router.post('/', Controller.postLogin)
router.get('/register', Controller.register)
router.post('/register', Controller.postRegister)
router.use('/admin', adminRouter)
router.use('/user', userRouter)

module.exports = router