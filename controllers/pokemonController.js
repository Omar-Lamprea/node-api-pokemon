const Pokemon = require('../models/pokemon');
const TypeOfPokemon = require('../models/typePokemon');

exports.getAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.find().populate('type')
    res.json(pokemons)
  } catch (error) {
    res.status(500).json({message: err.message})
  }
}

exports.getPokemonById = async(req, res) =>{
  try {
    const type = await Pokemon.findById(req.query.id);
    if (!type) 
      return res.status(404).json({ message: 'Pokémon no encontrado' });
    
    const pokemonData = await Pokemon.populate( type, {
      path: 'type', 
      select: 'name description'
    })
    res.json(pokemonData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.newPokemon = async (req, res) => {
  const {name, description, type} = req.body
  const typeExist = await TypeOfPokemon.findById(type)

  if (!typeExist) 
    return res.status(404).json({ message: 'Tipo de Pokémon no encontrado' });
  
  const saveNewPokemon = new Pokemon({
    name,
    description,
    type
  })

  try {
    const savePokemon = await saveNewPokemon.save();
    const pokemonData = await Pokemon.populate( savePokemon, {
      path: 'type', 
      select: 'name description'
    })
    res.status(201).json(pokemonData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.updatePokemonById = async(req, res) =>{
  const typeId = req.query.id;
  const { name, description, type } = req.body;
  try {
    const pokemon = await Pokemon.findByIdAndUpdate(
      typeId, 
      {name, description, type},
      {new: true}
    )
    if (!pokemon)
      return res.status(404).json({ message: 'Pokémon no encontrado' });
    const pokemonData = await Pokemon.populate( pokemon, {
      path: 'type', 
      select: 'name description'
    })
    res.json(pokemonData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.deletePokemonById = async(req, res) =>{
  const id = req.query.id

  try {
    const pokemon = await Pokemon.findByIdAndDelete(id)
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokémon no encontrado' });
    }
    res.json({ message: 'Pokémon eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}