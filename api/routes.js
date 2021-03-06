var bodyParser = require('body-parser');
var config = require('./configBD');
var User = require('./models/user').User;
var Url = require('./models/url').Url;
var base58 = require('./base58');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

module.exports = function (app) {

    app.use(require('./loadUser'));

    app.post('/authentication', urlencodedParser, jsonParser, function(req, res, next){
        var username = req.body.username;
        var password = req.body.password;

        User.findOne({username: username}, function (err, user) {
            if (err) return next(err);
            if (user) {
                if (user.password === password) {
                    req.session.user = user.username;
                    res.send(user);

                } else {
                    res.sendStatus(401);
                }
            } else {
                res.sendStatus(401);
            }
        })
    });

    app.post('/createUrl', urlencodedParser, jsonParser, function(req, res, next){
        var url_long = req.body.url_long;
        var description = req.body.description;
        var tags = req.body.tags.toLowerCase().split(' ');
        var author = req.session.user || req.body.author;

        Url.findOne({url_long: url_long}, function(err, url){
            if (err) return next(err);
            if(url) {
                res.send(url);
            } else {
                var newUrl = new Url({
                    author: author,
                    url_long: url_long,
                    description: description,
                    tags: tags
                });
                newUrl.save(function(err){
                    if (err) return next(err);
                    res.send(newUrl);
                });
            }
        });
    });

    app.post('/updateUrl', jsonParser, urlencodedParser, function(req, res, next) {
        var description = req.body.description;
        var tags = req.body.tags.toLowerCase().split(' ');
        var _id = req.body._id;

        Url.findByIdAndUpdate({_id: _id}, {$set: {description: description, tags: tags}}, function (err, url) {
            if (err) {
                return next(err);
            } else {
                res.send(url);
            }
        });
    });

    app.post('/registration', urlencodedParser, jsonParser, function(req, res, next){
        var username = req.body.username.toLowerCase();
        var password = req.body.password;

        User.findOne({username: username}, function (err, user) {
            if (err) return next(err);
            if (user) {
                res.sendStatus(401);
            } else {
                var user = new User({username: username, password: password});
                user.save(function (err) {
                    if (err) return next(err);
                    req.session.user = user.username;
                    res.send(user);
                });
            }
        })
    });

    app.post('/logout', function (req, res){
        req.session.destroy();
        res.redirect('/');
    });

    app.get('/urlsAuth', function (req, res, next) {
        Url.find({author: req.session.user}, function (err, urls) {
            if(err) return next(err);
            res.json(urls) ;
        })
    });

    app.get('/urls', function (req, res, next) {
        Url.find({}, function (err, urls) {
            if(err) return next(err);
            res.send(urls);
        });
    });

    app.get('/url/:_id', function (req, res) {
        Url.findById(req.params._id, function(err, url) {
            res.json(url);
        })
    });

    app.get('/template/:templateName', function(req, res){
        res.render(req.params.templateName);
    });

    app.get('/:encoded_id', function (req, res, next) {
        var id = base58.decode(req.params.encoded_id);

        Url.findOneAndUpdate({_id: id}, {$inc: {counter: 1}}, function(err, url) {
            if (err) return next(err);
            if (url) {
                res.redirect(url.url_long);
            } else {
                res.redirect(config.webhost);
            }
        })
    });

};