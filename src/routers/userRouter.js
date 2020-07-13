const express = require('express')
const router = new express.Router()

const User = require('../models/user');
const Auth = require('../middleware/auth');

const multer = require('multer');
const sharp = require('sharp')
const { signUp, deleteAcc } = require('../emails/accounts')

router.post('/users', async(req, res) => {
    const user = new User(req.body); // create instance of a new user
    try {
        await user.save()
        signUp(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// router.get('/users/login', (req, res) => {
//     res.render('index')
// })

router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/users/logout', Auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send() //200
    } catch (e) {
        res.status(500)
    }
})

router.post('/users/logoutAll', Auth, async(req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', Auth, async(req, res) => {
    res.send(req.user)
})

router.patch('/users/me', Auth, async(req, res) => {
    const updates = Object.keys(req.body) //create new array with list of keys from obj
    const isAllowed = ['name', 'email', 'age', 'password'];
    const isValidOperation = updates.every((update) => isAllowed.includes(update)) //every() returns true/false

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Inputs!' })
    }
    try {
        updates.forEach(update => req.user[update] = req.body[update])
            //.pre execution
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/users/me', Auth, async(req, res) => {
    try {
        await req.user.remove()
        deleteAcc(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)/)) {
            return cb(new Error('File Type must JPG, JPEG or PNG'))
        }
        return cb(undefined, true)
    }
})

router.post('/users/me/avatar', Auth, upload.single('avatar'), async(req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatars = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', Auth, async(req, res) => {
    req.user.avatars = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatars) {
            throw new Error() //stop exectuion
        }
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatars)
    } catch (error) {
        res.status(400).send()
    }
})

module.exports = router