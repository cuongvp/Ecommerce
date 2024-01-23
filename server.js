require('dotenv').config()
const app = require('./app')

const PORT = process.env.DEV_APP_PORT

const server = app.listen(PORT, () => {
    console.log(`App is listening at port: ${PORT}`)
})

// process.on('SIGINT', () => {
//     server.close(() => console.log("EXIT SERVER!"))
// })