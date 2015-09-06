var express = require('express'),
    api = require('./node/api');
    app = express(),
    port = process.env.port || 3000;

app.use(express.static('www'));

app.get('/api/identity', api.identity);
app.get('/api/collection', api.collection);
app.get('/signin', api.signin);
app.get('/oauth/callback', api.oauthCallback);
app.get('/signout', api.signout);

app.get('*', function(req, res){
    res.sendFile('index.html', {
        root: __dirname + '/www/'
    });
});

app.listen(port, function(){
    console.log('server started at http://localhost:' + port);
});
