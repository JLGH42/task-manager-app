const express = require('express')
const router = new express.Router()

const Task = require('../models/task');
const Auth = require('../middleware/auth')

router.post('/tasks', Auth, async(req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// GET /tasks?limit=10&skip=10 
// GET /tasks?sortBy="field":-1/1
router.get('/tasks', Auth, async(req, res) => {
    const match = {};
    const sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.splice(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // const tasks = await Task.find({ owner: req.user._id })
        // if (!tasks) {
        //     res.status(404).send()
        // }
        // alternative
        await req.user.populate({
            path: 'userTasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.status(200).send(req.user.userTasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', Auth, async(req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findOne({ _id: id, owner: req.user._id })
        if (!task) {
            res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }


    // Task.findById(id  )
    //     .then((task) => {
    //         if (!task) {
    //             return res.status(404).send()
    //         }
    //         res.status(200).send(task)
    //     })
    //     .catch((e) => {
    //         res.status(500).send()
    //     })
})

router.patch('/tasks/:id', Auth, async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdate = ['description', 'complete'];
    const isValidOperation = updates.every((update) => allowedUpdate.includes(update)) //true/false

    if (!isValidOperation) {
        return res.status(400).send({ error: "Update cannot be found" })
    }
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            res.status(404).send()
        }
        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        res.send(task);
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', Auth, async(req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id) //returns null when nothing is found
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            res.status(404).send()
        }
        await task.remove()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router