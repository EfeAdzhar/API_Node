var express = require('express');
var bodyParser = require('body-parser')
var app = express();

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
        id: Date.now(),
        name: req.body.name
    }
    coordinates.push(coordinate)
    res.send(coordinate)
})

app.put('/coordinates/:id', function (req, res) {
    var coordinate = coordinates.find(function(coordinate) {
        return coordinate.id === Number(req.params.id)
    });
    coordinate.name = req.body.name
    res.send(coordinate)
})

app.listen(3000, function () {
    console.log('API app start')
})