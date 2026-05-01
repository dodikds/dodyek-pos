const mongoose = require('mongoose')

// const URL = 'mongodb+srv://dodikds_db_user:E68fN17o5yR7tqlP@cluster0.tjc9nk2.mongodb.net/?appName=Cluster0/sheypos-udemy'
// const URL = 'mongodb+srv://dodikds_db_user:E68fN17o5yR7tqlP@cluster0.tjc9nk2.mongodb.net/sheypos-udemy?retryWrites=true&w=majority'
const URL = 'mongodb://dodikds_db_user:E68fN17o5yR7tqlP@ac-utihsw5-shard-00-00.tjc9nk2.mongodb.net:27017,ac-utihsw5-shard-00-01.tjc9nk2.mongodb.net:27017,ac-utihsw5-shard-00-02.tjc9nk2.mongodb.net:27017/sheypos-udemy?ssl=true&replicaSet=atlas-4ren76-shard-0&authSource=admin&appName=Cluster0'

mongoose.connect(URL)

let connectionObj = mongoose.connection

connectionObj.on('connected', () => {
    console.log('Mongo DB Connection Successfull')    
})

connectionObj.on('error', (err) => {
    console.log('Mongo DB Connection Failed', err)
})