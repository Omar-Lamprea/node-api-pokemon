const TypeOfPokemon = require('../models/typePokemon')
const Pokemon = require('../models/pokemon')

exports.getAllTypes = async (req, res) => {
  try {
    const types = await TypeOfPokemon.find()
    res.json(types)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

exports.newType = async (req, res) => {
  const type = new TypeOfPokemon({
    name: req.body.name,
    description: req.body.description
  })

  try {
    const newPokemonType = await type.save()
    res.status(201).json(newPokemonType)
  } catch (err) {
    res.status(400).json({message: err.message})
  }
}

exports.getTypeById = async (req, res) => {
  try {
    const type = await TypeOfPokemon.findById(req.query.id);
    if (!type) 
      return res.status(404).json({ message: 'Tipo de Pokémon no encontrado' });
    res.json(type);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


exports.updateTypeById = async (req, res) => {
  const typeId = req.query.id;
  const { name, description } = req.body;
  try {
    const type = await TypeOfPokemon.findByIdAndUpdate(
      typeId, 
      {name, description},
      {new: true}
    )
    if (!type)
      return res.status(404).json({ message: 'Tipo de Pokémon no encontrado' });
    res.json(type);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.deleteTypeById = async (req, res) => {
  const typeId = req.query.id
  try {
    const pokemonesAsociados = await Pokemon.exists({ type: typeId })

    if(pokemonesAsociados)
      return res.status(400).json({ message: 'No puedes eliminar este tipo de Pokémon porque hay Pokémon asociados a él' });

    const type = await TypeOfPokemon.findByIdAndDelete(typeId)
    if (!type) 
      return res.status(404).json({ message: 'Tipo de Pokémon no encontrado' });
    
    res.json({ message: 'Tipo de Pokémon eliminado correctamente' });
  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}