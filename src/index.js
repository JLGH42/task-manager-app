const app = require('./app.js')
    // const session = require('express-session');

const { NODE_ENV, PORT, SESS_SECRET, SESS_NAME } = process.env
console.log(PORT)
const fiveHours = 1000 * 60 * 60 * 5
const SESS_IN_PROD = NODE_ENV === 'production'

// app.use(session({
//     secret: SESS_SECRET,
//     name: SESS_NAME,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: SESS_IN_PROD,
//         httpOnly: true,
//         maxAge: fiveHours,
//     }
// }));

app.listen(PORT, () => console.log(`Application running on port ${PORT}`))