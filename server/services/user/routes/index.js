const router = require('express').Router()
const User = require('../controllers/User')

router.get('/users', User.findAll)
router.get('/users/:id', User.findById)
router.post('/users', User.insertOne)

module.exports = router
