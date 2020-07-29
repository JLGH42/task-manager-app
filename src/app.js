const express = require('express');
const bodyParser = require('body-parser')
const hbs = require('hbs')
const path = require('path')
require('./db/mongoose'); //executes file immediately

const app = express();
const port = process.env.PORT

const viewsPath = path.join(__dirname, '../templates/views/')
const partialsPath = path.join(__dirname, '../templates/partials')
const public = path.join(__dirname, '../public')

app.use(express.static(public))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(path.join(partialsPath))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json())

// const loginRouter = require('./routers/login')
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => console.log(`Application running on Port ${port}`))