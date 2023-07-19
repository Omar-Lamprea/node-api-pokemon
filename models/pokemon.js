const mongoose = require('mongoose')

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'typeOfPokemon',
    required: true
  }
})

const Pokemon = mongoose.model('Pokemon', pokemonSchema)

module.exports = Pokemon