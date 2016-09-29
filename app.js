var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var config = require('./api/configBD');
var MongoStore = require('connect-mongo')(session);
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

var app = express();

app.set('views', path.join(__dirname, 'ui/template'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    key: 'sid',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: null
    },
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(express.static(path.join(__dirname, 'ui/public')));

require('./api/routes')(app);

app.get('/*',function(req, res){
    res.render('index');
});


app.listen(port, function(){
   console.log('Server listening on port 3000')
});
