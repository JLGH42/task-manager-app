const express = require('express')
const router = new express.Router();

router.get('/get-started', (req, res) => {
    res.render('getStarted')
})

module.exports = router;