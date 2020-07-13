require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5e8ae81ba6aa27147074b09c', { age: 30 }).then((update) => {
//     console.log(update.n)
//     User.find({ age: 30 })
// }).then((user30) => {
//     console.log(user30)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments(age);
    return { user, count }
}

updateAgeAndCount('5e8ae81ba6aa27147074b09c', 27).then(({ user, count }) => {
    console.log(user, count)
}).catch((e) => {
    console.log(e)
})