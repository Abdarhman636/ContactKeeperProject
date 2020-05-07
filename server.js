const express = require('express');
const conectDB = require('./config/db')

const app = express();

// Coneccet the DB
conectDB();

// Init Middeleware 
// to aaccept the body data
app.use(express.json({ extended: false}))

app.get('/', (req, res) => {
     res.json({ msg: 'Welcome to ContactKeeper API...'})
})


app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('the SERVER has started'))