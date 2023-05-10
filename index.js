const express = require('express')
const app = express()
const port = 4000
const router = require('./routes/files.routes')

// CORS sin la librería externa cors
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use('/', router)

app.listen(process.env.PORT || port, () => {
  console.log(`Toolbox app listening on port ${port}`)
})
