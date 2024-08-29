const Joi = require("joi");
const validateProductReq = function ({ requestData }) {
  try {
    const schema = Joi.object({
      ["product_name"]: Joi.string().required(),
      ["description"]: Joi.string().allow("", null).optional(),
      ["img_url"]: Joi.string().required(),
      ["price"]: Joi.number().precision(2).required(),
    });

    const { error: { details } = {} } = schema.validate({
      ["product_name"]: requestData["product_name"],
      ["description"]: requestData["description"],
      ["img_url"]: requestData["img_url"],
      ["price"]: requestData["price"],
    });

    if (details) {
      throw details[0];
    }
    return requestData;
  } catch (error) {
    console.error(`While validate Request Body,
    Error:${error}, Error Json: ${JSON.stringify(error)}`);
    throw error;
  }
};

const validateUpdateProduct = function ({ requestData }) {
  try {
    const schema = Joi.object({
      ["product_uid"]: Joi.number().required(),
      ["product_name"]: Joi.string().optional(),
      ["description"]: Joi.string().allow("", null).optional(),
      ["img_url"]: Joi.string().optional(),
      ["price"]: Joi.number().precision(2).optional(),
    });

    const { error: { details } = {} } = schema.validate({
      ["product_uid"]: requestData["product_name"],
      ["product_name"]: requestData["product_name"],
      ["description"]: requestData["description"],
      ["img_url"]: requestData["img_url"],
      ["price"]: requestData["price"],
    });

    if (details) {
      throw details[0];
    }
    return requestData;
  } catch (error) {
    console.error(`While validate Request Body,
    Error:${error}, Error Json: ${JSON.stringify(error)}`);
    throw error;
  }
};

module.exports = {
  validateProductReq,
  validateUpdateProduct,
};
