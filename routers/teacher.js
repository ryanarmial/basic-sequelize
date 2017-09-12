const express = require('express');
const router = express.Router()
const db = require('../models')


router.use((req, res, next) => {
  if(req.session.authority === 3){
    next()
  } else {
    res.redirect('/')
  }
})


router.get('/', (req, res) => {
  db.Teacher.findAll({
    order: [['first_name', 'ASC']],
    include: [db.Subject]
  })
  .then(dataGuru => {
    db.Subject.findAll()
    .then(dataSubject => {
      // res.send(dataGuru)
      res.render('teacher', {dataGuru: dataGuru, dataSubject: dataSubject})
    })
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/', (req, res) => {
  db.Teacher.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date(),
    SubjectId: req.body.SubjectId
  })
  .then(ok => {
    res.redirect('/teachers')
  })
  // res.send(req.body)
})

router.get('/edit/:id', (req, res) => {
  db.Teacher.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    db.Subject.findAll()
    .then(datasubject => {
      res.render('teacher-edit', {editGuru: data, dataSubject: datasubject})
    })
  })
})

router.post('/edit/:id', (req, res) => {
  db.Teacher.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    SubjectId: req.body.SubjectId,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    where: {
      id: req.params.id
    }
  })
  .then(ok => {
    res.redirect('/teachers')
  })
})


router.get('/delete/:id', (req, res) => {
  db.Teacher.destroy({
    where: {
      id: req.params.id
    }
  })
  .then( ok => {
    res.redirect('/teachers')
  })
})

module.exports = router
