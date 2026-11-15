const propertyService = require('./property.service');

const list = async (req, res, next) => {
  try {
    const data = await propertyService.listProperties(req.query);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const detail = async (req, res, next) => {
  try {
    const data = await propertyService.getPropertyById(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    // req.user middleware se aata hai, uski id nikal kar property mein daal rahe hain
    const propertyData = { ...req.body, ownerId: req.user.id }; 
    const data = await propertyService.createProperty(propertyData);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

module.exports = { list, detail, create };