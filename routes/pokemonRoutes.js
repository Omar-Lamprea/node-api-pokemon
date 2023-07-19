const express = require('express')
const router = express.Router()
const pokemonController = require('../controllers/pokemonController')

router.get('/pokemon/all', pokemonController.getAllPokemons);
router.post('/pokemon', pokemonController.newPokemon);
router.get('/pokemon', pokemonController.getPokemonById);
router.put('/pokemon', pokemonController.updatePokemonById);
router.delete('/pokemon', pokemonController.deletePokemonById);


module.exports = router
