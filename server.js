var express = require('express'),
    api = require('./node/api');
    app = express(),
    port = process.env.PORT || 3000;

app.use(express.static('www'));

app.get('/api/identity', api.identity);
app.get('/api/collection', api.collection);
app.get('/signin', api.signin);
app.get('/oauth/callback', api.oauthCallback);
app.get('/signout', api.signout);

app.get('/env', function(req, res){
    res.send(app.settings.env);
})

app.get('*', function(req, res){
    res.sendFile('index.html', {
        root: __dirname + '/www/'
    });
});

app.listen(port, function(){
    console.log('server started at http://localhost:' + port);
});
