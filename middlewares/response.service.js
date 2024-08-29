/**
 * Sends a JSON response.
 *
 * @param {Object} res - Express response object.
 * @param {number} statusCode - HTTP status code.
 * @param {boolean} success - Optional Indicates success or failure.
 * @param {string} message - Optional Response message.
 * @param {Object} [data] - Optional data to send in the response.
 */
const sendResponse = ({
  res,
  statusCode = 200,
  status = "success",
  message = "",
  data = null,
}) => {
  const response = {
    status,
  };
  const successStatusCodes = [200, 201];
  if (!successStatusCodes.includes(statusCode)) {
    response.status = "failed";
  }
  if (message) {
    response.message = message;
  }
  if (data) {
    response.data = data;
  }
  return res.status(statusCode).json(response);
};

module.exports = {
  sendResponse,
};
