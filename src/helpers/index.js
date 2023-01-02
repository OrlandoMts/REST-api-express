const dbValidator = require("./db-validators");
const genereteJWT = require("./generete-jwt");
const googleVerify = require("./google-verify");
const uploadFiles = require("./uploads-file");

module.exports = {
	...dbValidator,
	...genereteJWT,
	...googleVerify,
	...uploadFiles,
};
