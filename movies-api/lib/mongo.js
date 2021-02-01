const { MongoCliente, ObjectId, MongoClient } = require('mongodb')

const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
        this.dbName = DB_NAME;
    }

    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((res, rej) => {
                this.client.connect(err => {
                    if (err) {
                        rej(err);
                    }
                    console.log('Connected succesfolly to mongodb')
                    res(this.client.db(this.dbName));
                })
            });
        }
        return MongoLib.connection;
    }


    //implementandoo crud

    getAll(collection, query) {
        return this.connect().then(db => {
            return db.collection(collection).find(query).toArray();
        })
    }

    get(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id) });

        })
    }

    create(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).inserOne(data).toArray();



        }).then(result => result.insertedId)
    }

    update(collection, id, data) {
        return this.connect().then(db => {
            return db.collection(collection).updateOneind({ _id: ObjectId }, { $set: data }, { upsert: true }).toArray();


        }).then(result => result.upsertedId || id);
    }

    delete(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id) })

        }).then(result => id)
    }
}

module.exports = MongoLib;