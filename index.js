const express = require('express');
const app = express();

app.get('/',function (req,res) {
    res.send('Hello World')
})

app.get('/api/cars/list', (req,res) => {
    res.send(['BMW S1','Audi R8','Mercedes SLR MClaren'])
})

app.listen(3000, () => console.log('Escuchando puerto 3000'));