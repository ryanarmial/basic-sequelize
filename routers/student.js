const express = require('express');
const router = express.Router()
const db = require('../models')

router.use((req, res, next) => {
  if(req.session.authority > 0){
    next()
  } else {
    res.redirect('/')
  }
})

router.get('/', (req, res) => {
  db.Student.findAll({
    order: [['first_name', 'ASC']]
  })
  .then(dataSiswa => {
    res.render('student', {dataSiswa: dataSiswa})
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/', (req, res) => {
  db.Student.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(ok=>{
    res.redirect('/students')
  })
})

router.get('/edit/:id', (req, res) => {
  db.Student.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(dataSiswa => {
    res.render('student-edit', {data: dataSiswa[0], pesan: false})
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/edit/:id', (req, res) => {
  console.log(req.body);
  db.Student.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    updatedAt: new Date()
  },{
    where:{
      id: req.params.id
    }
  })
  .then(ok => {
    console.log(ok);
    res.redirect('/students')
  })
  .catch(err => {
    // res.send(err)
    //   console.log('==========================');
    // console.log(err.message);
    db.Student.findAll({
      where: {
        id: req.params.id
      }
    })
    .then(dataSiswa => {
      res.render('student-edit', {data: dataSiswa[0], pesan: err.errors[0].message})
    })
  })
})

router.get('/delete/:id', (req, res) => {
  db.Student.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(ok => {
    db.StudentSubject.destroy({
      where: {
        StudentId: req. params.id
      }
    })
    .then(()=> {
      res.redirect('/students')
    })
  })
})

router.get('/:id/addsubject', (req, res) => {
  db.Student.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(dataSiswa => {
    db.Subject.findAll()
    .then(dataSubject => {
      res.render('student-subject', {data: dataSiswa[0], dataSubject: dataSubject})

    })
  })
})

router.post('/:id/addsubject', (req, res) => {
  db.StudentSubject.create({
    StudentId: req.params.id,
    SubjectId: req.body.SubjectId,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(ok => {
    res.redirect('/students')
  })
})



module.exports = router
