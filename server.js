var express = require('express'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    MongoStore = require('connect-mongo')(expressSession),
    app = express();

global.env = app.settings.env;
global.port = process.env.PORT || 3000;

var api = require('./node/api');

app.use(express.static('www'));
app.use(cookieParser());
app.use(expressSession({
    secret: '1234567890QWERTY',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: 'mongodb://localhost/mmmvinyl'
    })
}));

app.get('/api/identity', api.identity);
app.get('/api/collection', api.collection);
app.get('/signin', api.signin);
app.get('/oauth/callback', api.oauthCallback);
app.get('/signout', api.signout);

app.get('/env', function(req, res){
    res.send(app.settings.env);
})

app.get('/port', function(req, res){
    res.send(port.toString());
})

app.get('*', function(req, res){
    res.sendFile('index.html', {
        root: __dirname + '/www/'
    });
});

app.listen(port, function(){
    console.log('server started at http://localhost:' + port);
});
