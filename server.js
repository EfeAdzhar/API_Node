var express = require('express');
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient

var app = express();
var db; 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var coordinates = [
    {
    id: 1,
    name: 'Station',
    hours: '24/7',
    latitude: 52.251519,
    longitude: 21.052143,
    },
    {
    id: 2,
    name: 'Home',
    hours: '7:00 - 23:00',
    latitude: 52.25367,
    longitude: 21.05233,
    }
]

app.get('/', function(req, res) {
    res.send('Hello API')
})

app.get('/coordinates', function(req, res) {
    res.send(coordinates)
})

app.get('/coordinates/:id', function(req, res) {
    var coordinate = coordinates.find(function(coordinate) {
        return coordinate.id === Number(req.params.id)
    })
    res.send(coordinate)
})

app.post('/coordinates', function(req, res) {
    var coordinate = {
        name: req.body.name
    }
    //res.send(coordinate)
    db.collection('coordinates').insert(coordinate, function(err, result) {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }
        res.send(coordinate)
    })
})

app.put('/coordinates/:id', function (req, res) {
    var coordinate = coordinates.find(function(coordinate) {
        return coordinate.id === Number(req.params.id)
    });
    coordinate.name = req.body.name
    res.sendStatus(200)
})

app.delete('/coordinates/:id', function (req, res) {
    coordinates = coordinates.filter(function(coordinate) {
        return coordinate.id !== Number(req.params.id)
    })
    res.sendStatus(200)
})

MongoClient.connect('mongodb://localhost:27017/myapi', function(err, database) {
    if (err) {
        return console.log(err)
    }
    db = database
    app.listen(3000, function () {
        console.log('API app start')
    })
})