const router = require('express').Router();
const Controller = require('../controllers/controller');
const adminRouter = require('./admin');
const userRouter = require('./user');



router.get('/', Controller.loginPage)
router.post('/', Controller.postLogin)
router.get('/register', Controller.register)
router.post('/register', Controller.postRegister)
router.get('/verify/:id', Controller.verification)

router.get('/logout', Controller.logOut)

router.use((req,res,next) => {
    console.log(req.session)
    if (req.session.userId) {
        next()
    } else {
        const error = 'Please Login First'
        res.redirect(`/?errors=${error}`)
    }
})

router.use('/admin', adminRouter)
router.use('/user', userRouter)

module.exports = router