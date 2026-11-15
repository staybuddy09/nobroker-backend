const Property = require('./property.model');

const listProperties = async ({ city, type }) => {
  let query = {};
  if (city) query.city = new RegExp(city, 'i');
  if (type) query.type = type;
  
  // Ab ye data database se layega
  return await Property.find(query);
};

const getPropertyById = async (id) => {
  const property = await Property.findById(id);
  if (!property) throw new Error('Property not found');
  return property;
};

const createProperty = async (data) => {
  return await Property.create(data);
};

module.exports = { listProperties, getPropertyById, createProperty };