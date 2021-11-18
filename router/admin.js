const router = require('express').Router();
const Controller = require('../controllers/controller')

router.get('/', Controller.adminHomePage)
router.get('/addCourse', Controller.adminAddCourse)
router.post('/addCourse', Controller.adminPostAddCourse)
router.get('/addTeacher', Controller.addTeacher)
router.post('/addTeacher', Controller.addPostTeacher)
router.get('/teachers', Controller.listTeachers)
router.get('/courses', Controller.listCourses)
router.get('/teacher/:id/delete', Controller.deleteTeacher)
router.get('/course/:id/delete', Controller.deleteCourse)
module.exports = router;