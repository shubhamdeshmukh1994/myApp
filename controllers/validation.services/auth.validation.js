const Joi = require("joi");

/**
 * validates SignUp Request using joi
 *
 * @param {Object} requestData - request object.
 * @param {string} user_name - user_name required.
 * @param {string} password - password required.
 * @param {boolean} is_admin - boolean is_admin optinal default false.
 * @param {string} [phone] - phone required.
 */
const validateSignUpRequest = function ({ requestData }) {
  try {
    const schema = Joi.object({
      ["user_name"]: Joi.string().required(),
      ["email"]: Joi.string().required(),
      ["password"]: Joi.string().required(),
      ["is_admin"]: Joi.boolean().default(false).required(),
      ["phone"]: Joi.string().required(),
    });

    const { error: { details } = {} } = schema.validate({
      ["user_name"]: requestData["user_name"],
      ["email"]: requestData["email"],
      password: requestData["password"],
      ["is_admin"]: requestData["is_admin"],
      ["phone"]: requestData["phone"],
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
/**
 * validates Sign In Request using joi
 *
 * @param {Object} requestData - request object.
 * @param {string} user_name - user_name required.
 * @param {string} password - password required.
 */
const validateSignInRequest = function ({ requestData }) {
  try {
    const schema = Joi.object({
      ["email"]: Joi.string().required(),
      ["password"]: Joi.string().required(),
    });

    const { error: { details } = {} } = schema.validate({
      ["email"]: requestData["email"],
      password: requestData["password"],
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
  validateSignUpRequest,
  validateSignInRequest,
};
