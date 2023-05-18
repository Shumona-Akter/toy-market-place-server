const express = require('express')
const app = express()
var cors = require('cors')
const port = process.env.PORT || 3000
require('dotenv').config()

// middleware
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello World!')
})
console.log(process.env.SECRET_KEY)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
 
})