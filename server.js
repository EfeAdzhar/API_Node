var express = require('express');
var app = express();

var coordinates = [
    {
    id: 1,
    name: 'Station',
    latitude: 52.251519,
    longitude: 21.052143,
    },
    {
    id: 2,
    name: 'Home',
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

app.listen(3000, function () {
    console.log('API app start')
})