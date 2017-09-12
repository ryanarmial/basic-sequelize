const express = require('express');
const router = express.Router()
const db = require('../models')
const descScore = require('../helpers/deskripsi');


router.use((req, res, next) => {
  if(req.session.authority > 1){
    next()
  } else {
    res.redirect('/')
  }
})


router.get('/', (req, res) => {
  db.Subject.findAll({
    order: [['subject_name', 'ASC']],
    include: [db.Teacher]
  })
  .then(dataSubject => {
    // res.send(dataSubject)
    res.render('subject', {dataSubject: dataSubject})
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/', (req, res) => {
  db.Subject.create({
    subject_name: req.body.subject_name
  })
  .then(ok => {
    res.redirect('/subjects')
  })
})

router.get('/edit/:id', (req, res)=> {
  db.Subject.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(dataSubject => {
    res.render('subject-edit', {dataSubject: dataSubject[0]})
  })
})

router.post('/edit/:id', (req, res) => {
  db.Subject.update({
    subject_name: req.body.subject_name
  },{
    where: {
      id: req.params.id
    }
  })
  .then(ok => {
    res.redirect('/subjects')
  })
})

router.get('/delete/:id', (req, res) => {
  db.Subject.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(ok => {
    db.StudentSubject.destroy({
      where: {
        SubjectId: req.params.id
      }
    })
    .then( () => {
      db.Teacher.update({
        SubjectId: null
      },{
        where: {
          SubjectId: req.params.id
        }
      })
      .then(()=>{
        res.redirect('/subjects')
      })
    })
  })
})

router.get('/:id/enrolledstudents', (req, res) => {
  db.StudentSubject.findAll({
    order: [['Student', 'first_name', 'ASC']],
    where: {
      SubjectId: req.params.id
    },
    include: [{ all: true }]
  })
  .then(result => {
    scoreArr = []
    for(let i = 0; i < result.length; i++){
      scoreArr.push(result[i].score)
    }
    // res.send(result)
    res.render('enrolled-students', {enrolled_data: result, nilai: descScore(scoreArr)})
  })
})

router.get('/:subId/:stuId/give-score', (req, res) => {
  db.Subject.findAll({
    where: {
      id: req.params.subId
    }
  })
  .then(Sub => {
    db.Student.findAll({
      where: {
        id: req.params.stuId
      }
    })
    .then(Stu => {
      res.render('give-score', {student: Stu[0], subject: Sub[0]})
    })
  })
})

router.post('/:subId/:stuId/give-score', (req, res) => {
  db.StudentSubject.update({
    score: req.body.score,
    createdAt: new Date(),
    updatedAt: new Date()

  },{
    where: {
      StudentId: req.params.stuId,
      $and: {
        SubjectId: req.params.subId
      }
    }
  })
  .then(ok => {
    res.redirect(`/subjects/${req.params.subId}/enrolledstudents`)
  })
})

module.exports = router
