require('../src/db/mongoose');
const Task = require('../src/models/task.js');

// Task.insertMany([{
//     description: "call broker",
// }, {
//     description: "make doctor appointment",
// }, {
//     description: "clean room"
// }]).then(() => {
//     return Task.findByIdAndDelete('5e8878960167cb1090b74762').then(() => {
//         return Task.countDocuments({ complete: false }).then((result) => {
//             console.log(result)
//             return result;
//         })
//     })
// }).catch((e) => {
//     console.log(e)
// })

// '5e8b2eb9cc3f2539d8eaa9f3'

const deleteAndCount = async(id, status) => { //async function passing id and complete values
    const del = await Task.findByIdAndDelete(id) //await executes promise
    const count = await Task.countDocuments({ status }) // next promise execution
    return { del, count } // return both values 
}

deleteAndCount('5e8b2eb9cc3f2539d8eaa9f3', false).then(({ del, count }) => { //execute async function cycle and destructure variables
    console.log(del)
    console.log('Tasks incomplete: ' + count) //execution on successful execution
}).catch((e) => {
    console.log(e) //erroring
})