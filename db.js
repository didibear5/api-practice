const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/testdb'

const mongoose = require('mongoose')

// Set up default mongoose connection
const mongoDB = dbURL
mongoose.connect(mongoDB)
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise
// Get the default connection
const db = mongoose.connection
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
