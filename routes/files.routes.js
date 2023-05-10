const express = require('express')
const router = express.Router()

const filesController = require('../controllers/files.controller')

router.get('/files/data', filesController.getFilesData)
router.get('/files/list', filesController.getFilesList)

module.exports = router
