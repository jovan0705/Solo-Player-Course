const { User, Course, Teacher } = require('../models/index')


class Controller {
    static loginPage(req, res) {
        res.render('login')
    }

    static postLogin(req, res) {
        let input = req.body
        if (input.username == 'admin') {
            User.findByPk(1)
                .then(data => {
                    if (data.password == input.password) {
                        res.redirect('/admin')
                    } else {
                        res.redirect('/') // ini nanti kasih error pake query
                    }
                })
                .catch(err => {
                    res.send(err)
                })
        } else {
            User.findAll({
                where: {
                    username: input.username
                }
            })
                .then(data => {
                    if (data[0].password == input.password) {
                        res.redirect(`/user/${data[0].id}`)
                    } else {
                        res.redirect('/') // ini nanti kasih error pake query
                    }
                })
                .catch(err => {
                    res.send(err)
                })
        }
        
    }

    static register (req, res) {
        res.render('register')
    }

    static postRegister (req, res) {
        let input = req.body;
        input.createdAt = new Date();
        input.updatedAt = new Date();
        input.role = 'User';
        // console.log(input)
        User.create(input)
            .then(data => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static userHomePage(req, res) {
        let id = req.params.id
        // console.log(id)
        User.findByPk(id) 
            .then(data => {
                // console.log(data)
                res.render('userHome', {data})
            })
            .catch(err => {

            })
    }

    static adminHomePage(req, res) {
        // res.send('ini di Admin Home Page')
        res.render('adminHome')
    }

    static addCourse(req, res) {
        res.render('addCourse')
    }

    static adminAddCourse(req, res) {
        res.render('adminAddCourse')
    }

    static adminPostAddCourse(req, res) {
        let input = req.body;
        input.createdAt = new Date();
        input.updatedAt = new Date();
        // console.log(input)
        Course.create(input)
            .then(data => {
                res.redirect('/admin')
            })
            .catch(err => {
                res.send(err)
            })
        // res.render('adminAddCourse')
    }

    static addTeacher(req, res) {
        Course.findAll()
            .then(data => {
                console.log(data)
                res.render('addTeacher', {data});
            })
            .catch(err => {
                res.send(err);
            })
    }

    static addPostTeacher(req, res) {
        let input = req.body;
        input.createdAt = new Date();
        input.updatedAt = new Date();
        Teacher.create(input)
            .then(data => {
                res.redirect('/admin')
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = Controller