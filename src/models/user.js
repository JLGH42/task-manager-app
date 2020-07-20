const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('You must provide a valid email address!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain the characters "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatars: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('userTasks', {
    ref: 'Tasks', // ref to model I'm relating
    localField: "_id", //field in doc that bonds each entity
    foreignField: "owner" //document that contains the field to bond the entities
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.tokens
    delete userObj.avatars

    return userObj
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to Login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to Login')
    }
    return user
}

userSchema.pre('save', async function(next) {
    //this = document in operation
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
        console.log('Saved!')
    }
    next()
})

userSchema.pre('remove', async function(next) {
    const user = this;
    await Task.deleteMany({ owner: user._id })
    next();
})

const User = mongoose.model('Users', userSchema)

module.exports = User