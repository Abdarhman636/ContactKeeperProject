const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const conectDB = () => {

     try {
          mongoose.connect(db, {
               useNewUrlParser: true,
               useCreateIndex: true,
               useFindAndModify: false,
               useUnifiedTopology: true,
          })
          console.log('Mongoose Connected')
     } catch (err) {
          console.error(err.massage)
          process.exit(1)
     }
}

module.exports = conectDB