const mongoose = require('mongoose');

//Map Global promises
mongoose.Promise = global.Promise;
//mongoose connect
mongoose.connect('mongodb://anjasw:anjasw1234@ds119088.mlab.com:19088/pusherpolling')
.then(() => console.log('Mongodb Connected'))
.catch(err => console.log(err));
