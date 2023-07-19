const express = require('express')
const router = express.Router()
const typePokemonController = require('../controllers/typePokemonController')

router.get('/pokemonTypes/all', typePokemonController.getAllTypes)
router.post('/pokemonTypes', typePokemonController.newType)
router.get('/pokemonTypes', typePokemonController.getTypeById)
router.put('/pokemonTypes', typePokemonController.updateTypeById)
router.delete('/pokemonTypes', typePokemonController.deleteTypeById)


module.exports = router