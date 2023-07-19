const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const typeOfPokemonRoutes = require('./routes/typePokemonRoutes')
const pokemonRoutes = require('./routes/pokemonRoutes')

const app = express()
const port = 3000;

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(bodyParser.json())

//const dbURI = 'mongodb://localhost:27017/api-pokemon-db';
const dbURI = 'mongodb+srv://lampreaomar:rw99chG0UXMs2HvO@cluster0.l3wdep4.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>console.log('connection success'))
.catch((err) => console.log('Error al conectar:', err))


app.use('/api', typeOfPokemonRoutes);
app.use('/api', pokemonRoutes);


app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});