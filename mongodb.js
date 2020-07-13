//CRUD operations
const {
    MongoClient,
    ObjectID
} = require('mongodb') //destructure object props returned from require

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'node-task-manager'

MongoClient.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000
}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to MongoDB')
    }
    const db = client.db(databaseName)
        // db.collection('tasks').findOne({
        //     _id: new ObjectID("5e69f93cecfaa6428c0676ef")
        // }, (error, task) => {
        //     if (error) {
        //         return console.log('cannot find document')
        //     }
        //     console.log(task)
        // })

    // db.collection('users').updateOne({
    //         _id: new ObjectID('5e68e34c03a8763c5073f967')
    //     }, {
    //         $set: {
    //             name: 'Jordany'
    //         }
    //     }) // returns promise /// or provide third arg (callback function)
    //     .then((results) => {
    //         console.log(results.modifiedCount)
    //     }).catch((error) => {
    //         console.log(error)
    //     })

    db.collection('tasks').deleteOne({
        description: 'Initialise hello world project'
    }).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })
})