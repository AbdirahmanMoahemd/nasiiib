import asyncHandler from 'express-async-handler'
import Settings from '../models/settingsModel.js'

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getSettings = asyncHandler(async (req, res) => {
    const settings = await Settings.find({})
    
    res.json(settings)

})


// @desc    Get user by Id 
// @route   GET /api/users/:id
// @access  Private/Admin
export const getSettingsById = asyncHandler(async (req, res) => {
    const settings = await Settings.findById(req.params.id)
    if (settings) {
        res.json(settings) 
    }
    else {
        res.status(404)
        throw new Error('Settings not found')
    }

})


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateSettings = asyncHandler (async (req, res) => {
  
    const { phoneNumber, logo } = req.body
  
  const settings = await Settings.findById(req.params.id)

  if (settings) {
      
    settings.phoneNumber = phoneNumber
    settings.logo = logo
    

    const updatedSettings = await settings.save()
    res.json({
    updatedSettings
  })
    }
    else {
        res.status(404)
        throw new Error('Settings Not Found')
    }


  
})


export const createSettings = asyncHandler (async (req, res) => {
    let settings = new Settings({
        phoneNumber : req.body.phoneNumber,
        logo : req.body.logo,
       
    })
    settings = await settings.save();

    if(!settings)
    return res.status(400).send('the settings cannot be created!')

    res.send(settings);
}) 