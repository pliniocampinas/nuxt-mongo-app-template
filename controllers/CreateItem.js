const Item = require('../models/Item');

module.exports = CreateItem = {
  handle: async (req, res) => {
    const newItem = new Item({
      name: req.body.name
    });
  
    await newItem.save()
    res.status(201).send('Created');
  }
}
