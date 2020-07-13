const mongoose = require('mongoose')
const validator = require('validator')

const connectionUrl = 'mongodb://127.0.0.1:27017/node-task-manager-mongoose'

mongoose.connect(connectionUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 30
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
}, {
    timestamps: true
})

// taskSchema.pre('save', async function(next) {
//     console.log('Editting: ', this)
//     next()
// })

const Task = mongoose.model('Tasks', taskSchema)

module.exports = Task;