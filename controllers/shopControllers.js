const Shop = require('../models/shop')
const Menu = require('../models/menu')

exports.index = async (req, res, next) => {
  const shop = await Shop.find().select('name photo location').sort({ photo: -1 })

  const shopWithPhotoDomain = await shop.map(item => {
    return {
      id: item._id,
      name: shop.name,
      photo: `http://localhost:3000/images/ ${item.photo}`,
      location: shop.location,
    }
  }
  )
  res.status(200).json({
    data: shopWithPhotoDomain
  })
}

// get menu
exports.menu = async (req, res, next) => {
  // show name hide price
  // const menu = await Menu.find().select('+name -price')

  // const menu = await Menu.find().where('price').lt(100);
  // const menu = await Menu.find({
  //   price: { $lt: 100 }
  // })
  const menu = await Menu.find().populate('shop', 'name location')

  res.status(200).json({
    data: menu
  })
}

// get shop by id with menu
exports.getShopWithMenu = async (req, res, next) => {
  const { id } = req.params
  const shopWithMenu = await Shop.findById(id).populate('menus')

  res.status(200).json({
    data: shopWithMenu
  })
}

exports.insert = async (req, res, next) => {
  const { name, location } = req.body
  const shop = new Shop({
    name,
    location
  })
  await shop.save();
  res.status(201).json({
    message: 'Add shop done'
  })
}