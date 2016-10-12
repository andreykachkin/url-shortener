var Url = require('../api/models/url').Url;
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var app = require('../app');

chai.use(chaiHttp);

describe('Urls', function() {

    describe('GET /urls', function() {
        it('it should GET all the urls', function(done) {
            chai.request(app)
                .get('/urls')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(14);
                    done();
                });
        });
    });

    describe('GET url/:id ', function() {
        it('it should GET an url by the given id', function(done) {
            var url = new Url({
                url_long: "https://www.mongodb.com",
                author: "yasep",
                description: "Документоориентированная система управления базами данных (СУБД) с открытым исходным кодом, не требующая описания схемы таблиц. Написана на языке C++.",
                tags: ['json', 'bd']
            });
            url.save( function(err, url) {
                chai.request(app)
                    .get('/url/' + url.id)
                    .send(url)
                    .end( function(err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('url_long');
                        res.body.should.have.property('author');
                        res.body.should.have.property('description');
                        res.body.should.have.property('tags');
                        res.body.should.have.property('_id').eql(+url.id);
                        done();
                    });
            });

        });
    });

    describe('POST /createUrl', function() {
        it('it should POST an url', function (done) {
            var url = {
                url_long: 'https://angularjs.org/',
                author: 'admin',
                description: 'AngularJS — Superheroic JavaScript MVW Framework',
                tags: 'angular js web'
            };
            chai.request(app)
                .post('/createUrl')
                .send(url)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('url_long');
                    res.body.should.have.property('author');
                    res.body.should.have.property('description');
                    res.body.should.have.property('tags');
                    res.body.should.have.property('counter');
                    done();
                });
        });
    });

    describe('POST /updateUrl', function() {
        it('it should PUT an url', function (done) {
            var url = {
                _id: '20054',
                description: 'Официальный сайт CSS-фреймворка Bootstrap',
                tags: 'bootstrap web css html'
            };
            chai.request(app)
                .post('/updateUrl')
                .send(url)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('description').eql(url.description);
                    res.body.should.have.property('tags').eql(url.tags.toLowerCase().split(' '));
                    done();
                });
        });
    });

});

describe('Users', function() {

    describe('POST /registration', function() {
        it('it should register', function (done) {
            var user = {
                username : 'valera',
                password : '000'
            };
            chai.request(app)
                .post('/registration')
                .send(user)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('username').eql(user.username);
                    res.body.should.have.property('password').eql(user.password);
                    done();
                });
        });
    });

    describe('POST /authentication', function() {
        it('it should check authentication', function (done) {
            var user = {
                username : 'admin',
                password : '12345'
            };
            chai.request(app)
                .post('/authentication')
                .send(user)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('username').eql(user.username);
                    res.body.should.have.property('password').eql(user.password);
                    done();
                });
        });
    });

});