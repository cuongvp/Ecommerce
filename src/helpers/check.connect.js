const mongoose = require('mongoose')
const os = require('os')
const process = require('process')

const _SECOND = 5000

const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log(`Num of connections: ${numConnection}`)
}

const checkOnverload = () => {
    setInterval(() => {
        const numConnections = mongoose.connections.length
        const numCores = os.cpus().length
        const numMemoryUsage = process.memoryUsage().rss
        // ví dụ mỗi core có thể chịu 5 connection
        const maxConnections = numCores * 5
        console.log(`=============== SERVER INFORMATION =================`)
        console.log(`Num of connections: ${numConnections}`)
        console.log(`Num of Cores: ${ numCores }`)
        console.log(`Memory Usage: ${ numMemoryUsage / (1024**2)} MB`)

        if(numConnections > maxConnections){
            console.log(`Server overload detected!`)
        }
    }, _SECOND)
}

module.exports = {
    countConnect,
    checkOnverload
}