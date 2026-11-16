const propertyService = require('./property.service');
const cloudinary = require('../../config/cloudinary');
const streamifier = require('streamifier');

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
    const propertyData = { ...req.body, ownerId: req.user.id }; 
    const data = await propertyService.createProperty(propertyData);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// 👇 Ye raha wo function jo missing tha
const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) throw new Error('Koi image nahi mili');

    const uploadFromBuffer = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'nobroker_properties' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await uploadFromBuffer();
    res.status(200).json({ success: true, imageUrl: result.secure_url });
  } catch (err) {
    next(err);
  }
};

// 👇 Dhyan se dekho, yahan uploadImage export ho raha hai
module.exports = { list, detail, create, uploadImage };