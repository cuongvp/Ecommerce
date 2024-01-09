const express = require('express')
const router = express.Router()

router.use('/v1/api/', require('./access/index'))

// router.get('', (req, res) => {
//     return res.status(200).json({
//         message: 'Hello!'
//     })
// })

module.exports = router