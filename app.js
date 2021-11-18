const express = require('express');
const app = express();
const router = require('./router')
const session = require('express-session')
const port = pryocess.env.PORT;


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'))

app.use(session({
    secret: 'hayo apa',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}))

app.use(router)

app.listen(port, () => {
    console.log(`App Listening to https://soloplayercourse.herokuapp.com`)
})