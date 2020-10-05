const express = require('express')
const photosRouter = require('./routes/photos')

const router = express.Router()

router.use('/api/v1/photos', photosRouter)

module.exports = router