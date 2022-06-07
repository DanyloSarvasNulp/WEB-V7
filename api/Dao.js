const MongoClient = require('mongodb').MongoClient
const reservationPosted = "posted"
const resrvationsEdited = "edited"

class Dao {

    dbConnection = null

    constructor() {
        this.connect()
    }

    connect = () => {
        this.dbConnection = new Promise((resolve, reject) => {
            const client = new MongoClient('mongodb+srv://root:kyx3cX5HwjDEBHPY@cluster0.cufld.mongodb.net/mydb3?retryWrites=true&w=majority'
                , {useNewUrlParser: true, useUnifiedTopology: true})
            client.connect()
                .then(() => client.db('mydb3'))
                .then(db => resolve(db))
                .catch(reject);
        })
    }

    ifConnected = dbAction => this.dbConnection ? this.dbConnection.then(dbAction) : Promise.reject('not connected')

    // User Operations

    addUser = record => this.ifConnected(db => db.collection('user').insertOne(record))
    getUsers = () => this.ifConnected(db => db.collection('user').find({}).toArray())
    getUserByUsername = username => this.ifConnected(db => db.collection('user').findOne({username: username}))
    updateUser = (username, fieldToUpdate) => this.ifConnected(db => db.collection('user').updateOne(this.getUserByUsername(username),
        {$set: fieldToUpdate}
    ))
    deleteUserByUsername = username => this.ifConnected(db => db.collection('user').findOneAndDelete({username}))

    // Reservation Operations

    addReservation = record => this.ifConnected(db => db.collection('reservation').insertOne(record))
    getReservations = () => this.ifConnected(db => db.collection('reservation').find({}).toArray())
    deleteReservations = () => this.ifConnected(db => db.collection('reservation').find({}).toArray())
    getReservationByPurpose = purpose => this.ifConnected(db => db.collection('reservation').findOne({
        purpose,
    }))
    deleteReservationByPurpose = purpose => this.ifConnected(db => db.collection('reservation').findOneAndDelete({purpose,}))
    // deleteReservationByPurpose = purpose => this.ifConnected(db => db.collection('reservation').remove( { } ))

    updateReservationByPurpose = (purpose, fieldToUpdate) => this.ifConnected(db => db.collection('reservation').updateOne({
            purpose,
        },
        {$set: fieldToUpdate}
    ))
}

module.exports = new Dao()
