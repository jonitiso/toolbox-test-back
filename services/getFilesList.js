const fetch = require('node-fetch')
const { constants: { EXTERNAL_API_URL, EXTERNAL_API_SECRET_TOKEN } } = require('../constants/files')

async function execute () {
  try {
    const secretFilesResp = await fetch(`${EXTERNAL_API_URL}/v1/secret/files`, {
      headers: { Authorization: 'Bearer ' + EXTERNAL_API_SECRET_TOKEN }
    })
    if (secretFilesResp.status !== 200) {
      console.error(await secretFilesResp.text())
      return []
    }
    return (await secretFilesResp.json())?.files || []
  } catch (e) {
    console.error(e)
    return []
  }
}

module.exports = {
  execute
}
