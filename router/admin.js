const router = require('express').Router();
const Controller = require('../controllers/controller')

router.get('/', Controller.adminHomePage)
router.get('/addCourse', Controller.adminAddCourse)
router.post('/addCourse', Controller.adminPostAddCourse)
router.get('/addTeacher', Controller.addTeacher)
router.post('/addTeacher', Controller.addPostTeacher)
module.exports = router;