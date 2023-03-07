const express = require('express')
const predictions = express.Router()
const cors = require('cors')


predictions.use(cors())

predictions.post('/register', (req, res) => {
	res.json({ reslult: 'success' })
})

module.exports = predictions;