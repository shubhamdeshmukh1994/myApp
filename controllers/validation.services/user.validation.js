const Joi = require("joi");

/**
 * validates SignUp Request using joi
 *
 * @param {Object} requestData - request object.
 * @param {string} user_uid - user_uid required.
 * @param {string} user_name - user_name required.
 * @param {string} password - password required.
 * @param {boolean} is_admin - boolean is_admin optinal default false.
 * @param {string} [phone] - phone required.
 */
const validateUpdateUser = function ({ requestData }) {
  try {
    const schema = Joi.object({
      ["user_uid"]: Joi.string().required(),
      ["user_name"]: Joi.string().optional(),
      ["email"]: Joi.string().optional(),
      ["password"]: Joi.string().optional(),
      ["is_admin"]: Joi.boolean().default(false).optional(),
      ["phone"]: Joi.string().optional(),
    });

    const { error: { details } = {} } = schema.validate({
      ["user_uid"]: requestData["user_uid"],
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

module.exports = {
  validateUpdateUser,
};
