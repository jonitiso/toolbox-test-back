const chai = require('chai')
const getFilesData = require('../services/getFilesData')

describe('Main', () => {
  let response

  before(async function () {
    this.timeout(10000)
    response = await getFilesData.execute()
  })

  it('should return an array of objects', async () => {
    chai.expect(response).to.be.an('array')
    chai.expect(response[0]).to.be.an('object')
  })

  it('should return an array of objects with line and file properties', async () => {
    chai.expect(response[0]).to.have.property('file')
    chai.expect(response[0]).to.have.property('lines')
  })
})
