const router = require('express').Router();
const Controller = require('../controllers/controller')

router.get('/:id', Controller.userHomePage);
router.get('/:id/addCourse', Controller.addCourse);


module.exports = router