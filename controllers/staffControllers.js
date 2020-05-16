const Staff = require('../models/staff')

exports.index = async (req, res, next) => {
  const staff = await Staff.find().sort({
    _id: 1
  });
  res.status(200).json({
    data: staff
  })
}

exports.show = async (req, res, next) => {
  try {
    const { id } = req.params
    // const staff = await Staff.findOne({
    //   _id: id
    // })
    const staff = await Staff.findById(id)
    res.status(200).json({
      data: staff
    })
  } catch (error) {
    res.status(400).json({
      error: {
        message: 'Not found'
      }
    })
  }
}

exports.insert = async (req, res, next) => {
  const { name, salary } = req.body
  const staff = new Staff({
    name,
    salary: salary * 2
  })
  await staff.save();
  res.status(201).json({
    message: 'Add staff done'
  })
}

exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params
    const staff = await Staff.deleteOne({ _id: id })
    if (staff.deletedCount === 0) {
      throw new Error('Can\'t delete, id not found')
    }
    res.status(200).json({
      message: 'Destroy done'
    })
  } catch (error) {
    res.status(400).json({
      error: {
        message: error.message
      }
    })
  }
}

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, salary } = req.body
    // way 1
    // const staff = await Staff.findById(id)
    // staff.name = name
    // staff.salary = salary
    // staff.edit = true
    // await staff.save()

    // way 2
    // const staff = await Staff.findOneAndUpdate(id, {
    //   name,
    //   salary,
    //   edit: true
    // })

    // way 3 
    const staff = await Staff.updateOne({ _id: id }, {
      name,
      salary,
      edit: true
    })
    console.log('staff:', staff)
    if (staff.nModified === 0) {
      throw new Error('Can\'t Update, data not change')
    } else {
      res.status(200).json({
        message: 'Update done'
      })
    }
  } catch (error) {
    res.status(400).json({
      error: {
        message: error.message
      }
    })
  }
}