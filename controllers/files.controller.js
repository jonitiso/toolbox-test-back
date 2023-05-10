const getFilesDataService = require('../services/getFilesData')
const getFilesListService = require('../services/getFilesList')

exports.getFilesData = async function (req, res) {
  try {
    const { fileName } = req.query
    const filesData = await getFilesDataService.execute(fileName)
    return res.status(200).json(filesData)
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message })
  }
}

exports.getFilesList = async function (req, res) {
  try {
    const filesData = await getFilesListService.execute()
    return res.status(200).json(filesData)
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message })
  }
}
