const express = require('express')
const exphbs = require('express-handlebars')

const router = require('./router')

const app = express()

const port = 3000

app.engine('handlebars', exphbs())

app.set('view engine', 'handlebars')
app.set('views', __dirname + '\\views')

app.use(express.json())

app.use(router)

app.listen(port, () => {
    console.log(`ssga-photo-app listening on port ${port}...`)
})