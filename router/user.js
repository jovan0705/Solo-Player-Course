const router = require('express').Router();
const Controller = require('../controllers/controller')

router.get('/:id', Controller.userHomePage);
router.get('/:id/addCourse', Controller.selectCourse);
router.get('/:id/addCourse/:CourseId', Controller.addCourse);
router.post('/:id/addCourse/:CourseId', Controller.addPostCourse);
router.get('/:id/cancelCourse/:CourseId/:TeacherId', Controller.cancelCourse);
router.get('/:id/detail', Controller.detailUser);
router.get('/:id/detail/edit', Controller.getEditDetail);
router.post('/:id/detail/edit', Controller.postEditDetail);




module.exports = router