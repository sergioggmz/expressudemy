const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cars = [
    {id: 0, company: 'BMW', model: 'X3', year: '2020'},
    {id: 1, company: 'Audi', model: 'R8', year: '2023'},
    {id: 2, company: 'Mercedes', model: 'Clase A', year: '2022'}
];
app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/api/cars/list', (req, res) => {
    res.send(['BMW S1', 'Audi R8', 'Mercedes SLR MClaren'])
})
app.get('/api/cars/id/:id', (req, res) => {
    res.send(req.params.id)
})
app.get('/api/cars/:company/:model', (req, res) => {
    res.send({
        "company": req.params['company'],
        "model": req.params['model']
    })
})

app.get('/api/cars', (req, res) => {
    res.send(cars);
})
app.get('/api/cars/:company', (req, res) => {
    const car = cars.find(cr => cr.company === req.params['company']);
    if (!car) {
        res.status(404).send('Car not found with these company name');
    } else {
        res.send(car);
    }
})

app.listen(port, () => console.log(`Escuchando puerto ${port}`));