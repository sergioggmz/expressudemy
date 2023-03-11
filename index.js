const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const {check, validationResult} = require('express-validator');
app.use(express.json());

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

app.post('/api/cars',(req,res) => {
    const {company,model,year} = req.body;

    const car = {
        id:cars.length,
        company,
        model,
        year
    }
    cars.push(car);

    res.status(201).send(car);
})
app.post('/api/cars2',(req,res) => {
    if(!req.body.company || req.body.company.length < 3) {
        res.status(400).send('Introduce la empresa correcta')
    }
    const {company,model,year} = req.body;
    const car = {
        id:cars.length,
        company,
        model,
        year
    }
    cars.push(car);

    res.status(201).send(car);
})

app.post('/api/cars3',[
    check('company').isLength({min:3}),
    check('model').isLength({min:3})
],(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors:errors.array()})
    }
    const {company,model,year} = req.body;
    const car = {
        id:cars.length,
        company,
        model,
        year
    }
    cars.push(car);

    return res.status(201).send(car);
})

app.put('/api/cars/:id',[
    check('company').isLength({min:3}),
    check('model').isLength({min:3})
],(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors:errors.array()})
    }

    const carFounded = cars.find(cr => cr.id === parseInt(req.params['id']))
    if(!carFounded) {
        return res.status(404).send('El coche con ese id no está');
    }
    const {company,model,year} = req.body;
    carFounded.company = company;
    carFounded.model = model;
    carFounded.year = year;

    return res.status(204).send(carFounded);
})
app.delete('/api/cars/:id', (req,res) => {
    const carFounded = cars.find(cr => cr.id === parseInt(req.params['id']))
    if(!carFounded) {
        return res.status(404).send('El coche con ese id no está, no se puede borrar');
    }
    const index = cars.indexOf(carFounded);
    cars.splice(index,1);
    res.status(200).send('coche borrado');
})
app.listen(port, () => console.log(`Escuchando puerto ${port}`));