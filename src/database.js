const mongoose = require('mongoose');

const URI ='mongodb+srv://user_node:Mimo2pTCxfUUEAZ7@miclustercafe.t5tri.mongodb.net/taskdb';
mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err=> console.error(err));


module.exports = mongoose;