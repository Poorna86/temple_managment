const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('./db/mongoose');
const userRouter = require('./routers/users');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(userRouter)
const publicPath = path.join(__dirname, '..' , 'public')
const port = process.env.PORT

app.use(express.static(publicPath))

app.get('*', (req, res) => {
    console.log('get request')
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
    console.log('server up running', port)
});