const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const morgan = require("morgan");
app.use(express.json());
app.use(morgan('tiny'))
app.use('/api/cars',require('./routes/car.routes'))

app.listen(port, () => console.log(`Escuchando puerto ${port}`));