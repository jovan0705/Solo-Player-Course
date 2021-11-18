process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const { User, Course, Teacher, UserCourses, Profile } = require('../models/index')
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');
const convertDate = require('../helpers/date')
const nodemailer = require('nodemailer');
  
  

class Controller {
    static loginPage(req, res) {
        let errors;
        if (req.query.errors !== undefined) {
            errors = req.query.errors.split(',')
        }
        res.render('login', {errors})
    }

    static postLogin(req, res) {
        let input = req.body
        if (input.username == 'admin' || input.username == 'admin@mail.com') {
            User.findByPk(1)
                .then(data => {
                    if (data.password == input.password) {
                        req.session.userId = data.id;
                        res.redirect('/admin')
                    } else {
                        res.redirect('/?errors=Wrong Password') // ini nanti kasih error pake query
                    }
                })
                .catch(err => {
                    res.send(err)
                })
        } else {
            let err2 = [];
            if (input.username == '') {
                err2.push('Please input your Username or Email')
            }
            if (input.password == '') {
                err2.push('Please input your Password')
            }
            User.findAll({
                where: {
                    [Op.or]: [{username:input.username}, {email: input.username}]
                }
            })
                .then(data => {
                    if(data) {
                        let isValid = bcrypt.compare(req.body.password, data[0].password)
                        if (isValid) {
                            if (data[0].active) {
                                req.session.userId = data[0].id;
                                res.redirect(`/user/${data[0].id}`)
                            } else {
                                const err = 'Please Activate your Account'
                                res.redirect(`/?errors=${err}`)
                            }
        
                        } else {
                            res.redirect('/?errors=Wrong Password') // ini nanti kasih error pake query
                        }
                    }

                })
                .catch(err => {
                    res.redirect(`/?errors=${err2}`)
                })
        }

    }

    static logOut(req, res) {
        req.session.destroy(err => {
            if (err) {
                console.log(err)
            } else {
                const err = 'Logged Out'
                res.redirect(`/?errors=${err}`)
            }
        })
    }

    static register(req, res) {
        let errors;
        if (req.query.errors !== undefined) {
            errors = req.query.errors.split(',')
        }
        res.render('register', {errors})
    }


    static postRegister(req, res) {
        let inputUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: 'User'
        };
        let inputProfile = {
            name: req.body.username,
            age: req.body.age,
            gender: req.body.gender,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
        };
        let err2 = {};
        if(req.body.name == '') {
            err2.name = 'Please Input your Full Name'
        }
        if(req.body.age == '') {
            err2.age = 'Please Input your Age'
        }
        if(req.body.gender == undefined) {
            err2.gender = 'Please Input your Gender'
        }
        if(req.body.profilePicture == '') {
            err2.profilePicture = 'Please Input your Profile Picture'
        }
        // console.log(inputProfile)
        let code;
        let id;
        User.create(inputUser)
            .then(data => {
                inputProfile.UserId = data.id;
                code = data.code
                id = data.id
                return Profile.create(inputProfile)
            })
            .then (data => {
                let mailTransporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'jovan0507@gmail.com',
                        pass: 'charlizard07'
                    }
                });
                console.log(data.code)
                console.log(data)
                let mailDetails = {
                    from: 'jovan0507@gmail.com ',
                    to: inputProfile.email,
                    subject: 'Verification Email',
                    text: `
                    Please click this Link to verify
                    http://localhost:3000/verify/${id}/?code=${code}
                    `
                };
                  
                mailTransporter.sendMail(mailDetails, function(err, data) {
                    if(err) {
                        console.log('Error Occurs');
                    } else {
                        console.log('Email sent successfully');
                    }
                });
                res.redirect('/')
  
            })
            .catch(err => {
                let errors;
                if (err.errors !== undefined) {
                    errors = err.errors.map(el=> {return el.message})
                }
                if (err2.name !== undefined) {
                    errors.push(err2.name);
                }
                if (err2.age !== undefined) {
                    errors.push(err2.age);
                }
                if (err2.gender !== undefined) {
                    errors.push(err2.gender);
                }
                if (err2.profilePicture !== undefined) {
                    errors.push(err2.profilePicture);
                }
                // res.send(errors)
                res.redirect(`/register/?errors=${errors}`)
            })
    }

    static verification(req, res) {
        let code = req.query.code;
        let id = req.params.id;
        User.findByPk(id)
            .then(data => {
                if (data.active) {
                    const err = 'Account has already been verified'
                    res.redirect(`/?errors=${err}`)
                } else if (code == data.code){
                    return User.update({
                        active: true
                    },{
                        where: {
                            id: id
                        }
                    })
                }
            })
            .then(data => {
                const err = 'Verify Successfull'
                res.redirect(`/?errors=${err}`)
            })
            .catch(err => {
                res.send(err)
            })
        
    }

    //USER

    static userHomePage(req, res) {
        let id = req.params.id;
        let filter = req.query.sortBy;
        filter = User.sortBy(filter);
        // console.log(id)
        console.log(filter)
        User.findByPk(id)
            .then(data => {
                // console.log(data)
                return User.findAll({
                    where: {
                        id: id
                    },
                    include: [{
                        model: Teacher,
                        key: 'id',
                        include: [{
                            model: Course,
                            key: 'id'
                        }]
                    },
                {
                    model:Course,
                    key: 'id'
                }, {
                    model:Profile,
                    key: 'id'
                }],
                    order: filter.order
                })
            })
            .then(data => {
                res.render('userHome', { data, convertDate})
                // res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }


    static selectCourse(req, res) {
        let id = req.params.id;
        Course.findAll()
            .then(data => {
                res.render('selectCourse', { data, id })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addCourse(req, res) {
        let id = req.params.id;
        let CourseId = req.params.CourseId;
        let errors;
        if (req.query.errors !== undefined) {
            errors = req.query.errors.split(',')
        }
        Teacher.findAll({
            where: {
                CourseId: CourseId
            }
        })
            .then(data => {
                Course.findByPk(CourseId, {
                })
                    .then(data2 => {
                        // res.send(data2)
                        res.render('addCourse', { data, data2, id, CourseId, errors})
                    })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addPostCourse(req, res) {
        let id = req.params.id;
        let CourseId = req.params.CourseId;
        let TeacherId = req.body.TeacherId;
        UserCourses.create({
            UserId: id,
            CourseId: CourseId,
            TeacherId: TeacherId,
        })
            .then(data => {
                res.redirect(`/user/${id}`)
            })
            .catch(err => {
                let errors = err.errors.map(el => {return el.message})
                // res.send(errors)
                res.redirect(`/user/${id}/addCourse/${CourseId}?errors=${errors}`)
            })
    }

    static cancelCourse(req, res) {
        UserCourses.destroy({
            where: {
                UserId: req.params.id,
                CourseId: req.params.CourseId,
                TeacherId: req.params.TeacherId
            }
        })
            .then(data => {
                res.redirect(`/user/${req.params.id}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static detailUser(req, res) {
        let id = req.params.id
        Profile.findAll({
            where: {
                UserId: id
            },
            include: {
                model: User,
                key: id
            }
        })
            .then (data => {
                // res.send(data)
                res.render('userDetail', {data})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getEditDetail(req, res) {
        let id = req.params.id
        let errors;
        if (req.query.errors !== undefined) {
            errors = req.query.errors.split(',')
        }
        Profile.findAll({
            where: {
                UserId: id
            },
            include: {
                model: User,
                key: 'id'
            }
        })
            .then(data => {
                // res.send(data)
                res.render('editDetail', {data, errors})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postEditDetail(req, res) {
        let input = req.body;
        let id = req.params.id;
        input.updatedAt = new Date();
        // console.log(input)
        Profile.update(input, {
            where: {
                UserId: id
            }
        })
            .then(data => {
                res.redirect(`/user/${id}`)
            })
            .catch(err => {
                let errors = err.errors.map(el=>{return el.message})
                res.redirect(`/user/${id}/detail/edit?errors=${errors}`)
            })
    }




    // ADMIN 


    static adminHomePage(req, res) {
        // res.send('ini di Admin Home Page')
        res.render('adminHome')
    }


    static adminAddCourse(req, res) {
        let errors;
        if(req.query.errors !== undefined) {
            errors = req.query.errors.split(',');
        }
        // console.log(errors)
        res.render('adminAddCourse', {errors})
    }

    static adminPostAddCourse(req, res) {
        let input = req.body;
        // console.log(input)
        Course.create(input)
            .then(data => {
                res.redirect('/admin')
            })
            .catch(err => {
                let errors = err.errors.map(el => {return el.message})
                res.redirect(`/admin/addCourse?errors=${errors}`)
            })
        // res.render('adminAddCourse')
    }

    static addTeacher(req, res) {
        let errors;
        if (req.query.errors !== undefined) {
            errors = req.query.errors.split(',')
        }
        // console.log(errors);
        Course.findAll()
            .then(data => {
                console.log(data)
                res.render('addTeacher', { data, errors });
            })
            .catch(err => {
                res.send(err);
            })
    }

    static addPostTeacher(req, res) {

        let input = req.body;
        input.UserId = req.params.id;
        Teacher.create(input)
            .then(data => {
                res.redirect('/admin')
            })
            .catch(err => {
                // console.log(err.errors)
                let errors = err.errors.map(el => {return el.message})
                res.redirect(`/admin/addTeacher?errors=${errors}`) // http://localhost:3000/admin/addTeacher
            })
    }

    static listTeachers(req, res) {
        Teacher.findAll({
            include: {
                model: Course,
                key: 'id',
                
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
            .then(data => {
                res.render('listTeachers', {data})
            })
    }

    static listCourses(req, res) {
        Course.findAll()
            .then(data => {
                res.render('listCourses', {data})
            })
    }

    static deleteTeacher(req, res) {
        let id = req.params.id
        Teacher.destroy({
            where: {
                id: id
            }
        })
        .then (data => {
            res.redirect('/admin')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static deleteCourse(req, res) {
        let id = req.params.id
        Course.destroy({
            where: {
                id: id
            }
        })
        .then (data => {
            res.redirect('/admin')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller