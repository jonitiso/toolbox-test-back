const fetch = require('node-fetch')
const getFilesList = require('./getFilesList')
const { constants: { EXTERNAL_API_URL, EXTERNAL_API_SECRET_TOKEN } } = require('../constants/files')

async function execute (filename = null) {
  const secretFiles = filename ? [filename] : await getFilesList.execute()

  const output = []

  for (const fileName of secretFiles) {
    const secretFileResp = await fetch(`${EXTERNAL_API_URL}/v1/secret/file/${fileName}`, {
      headers: { Authorization: 'Bearer ' + EXTERNAL_API_SECRET_TOKEN }
    })
    const csv = await secretFileResp.text()
    if (secretFileResp.status !== 200) {
      console.error(fileName + ': ' + csv)
      continue
    }

    const lines = convertCSVToJSON(csv)
    output.push({
      file: fileName, lines
    })
  }
  return output
}

function convertCSVToJSON (csv) {
  const output = []
  const lines = csv.split('\n')
  const headers = lines[0].split(',')

  for (let i = 1; i < lines.length; i++) {
    const obj = {}
    const line = lines[i].split(',')

    if (line.length !== headers.length) {
      continue
    }

    obj[headers[1]] = line[1]
    obj[headers[2]] = parseInt(line[2])
    obj[headers[3]] = line[3]

    output.push(obj)
  }

  return output
}

module.exports = {
  execute
}
