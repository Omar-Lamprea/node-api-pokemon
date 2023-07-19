const mongoose = require('mongoose')

const typeOfPokemonSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const TypeOfPokemon = mongoose.model('typeOfPokemon', typeOfPokemonSchema)

module.exports = TypeOfPokemon