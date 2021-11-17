const express = require('express');
const app = express();
const router = require('./router')
const port = 3000;


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'))

app.use(router)

app.listen(port, () => {
    console.log(`App Listening to http://localhost:${port}`)
})