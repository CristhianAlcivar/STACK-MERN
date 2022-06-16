const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const { moongose } = require('./database');
//settings
app.set('port', process.env.PORT || 4000);

//midelware
app.use(morgan('dev'));
app.use(express.json());
//routes
app.use('/api/tasks',require('./routes/task.routes'));
//static files
app.use(express.static(path.join(__dirname, 'public')));

//start server
app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'));
});