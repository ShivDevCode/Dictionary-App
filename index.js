const { urlencoded } = require('express')
const express = require('express')
const app = express()

const dictionaryRoute = require('./routes/dictionary')

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use('/', dictionaryRoute)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })