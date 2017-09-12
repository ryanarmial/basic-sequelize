const express = require('express');
const app = express()
const session = require('express-session');
const bodyParser = require('body-parser');
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const index = require('./routers/index');
const teachers = require('./routers/teacher');
const subjects = require('./routers/subject');
const students = require('./routers/student');
const users = require('./routers/user');

app.use(session({
  secret: '56!@#$!#2346234626!@#$!!@#$',
  resave: false,
  saveUnitialized: true,
  cookies: {}
}))

app.use('/', index)
app.use('/students', students)
app.use('/subjects', subjects)
app.use('/teachers', teachers)
app.use('/users', users)

app.listen(process.env.PORT || 3000, () => {
  console.log('Lagi dengerin kamu di Jendela 3000');
})
