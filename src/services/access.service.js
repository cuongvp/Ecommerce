const shopModel = require("../models/shop.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { BadRequestError } = require("../core/error.response");

const roleShop = {
	SHOP: "SHOP",
	WRITER: "WRITER",
	EDITER: "EDITER",
	ADMIN: "ADMIN",
};

class AccessService {
	static signUp = async ({ name, email, password }) => {
		const holderShop = await shopModel.findOne({ email }).lean();

		if (holderShop) {
			throw new BadRequestError("Error: Shop is already registered!");
		}

		var salt = bcrypt.genSaltSync(10);
		var hashPassword = bcrypt.hashSync(password, salt);

		// create shop
		const newShop = await shopModel.create({
			name,
			email,
			password: hashPassword,
			roles: [roleShop.SHOP],
		});

		if (newShop) {
			// created privateKey, publicKey

			const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
				modulusLength: 4096,
				publicKeyEncoding: {
					type: "pkcs1",
					format: "pem",
				},
				privateKeyEncoding: {
					type: "pkcs1",
					format: "pem",
				},
			});

			const publicKeyString = await KeyTokenService.createKeyToken({
				userId: newShop._id,
				publicKey: publicKey,
			});

			if (!publicKeyString) {
				return {
					code: "publicKeyString xxx",
					message: "publicKey error",
				};
			}

			// create token pair
			const tokens = await createTokenPair(
				{
					userId: newShop._id,
					email,
				},
				publicKey,
				privateKey
			);

			console.log(`Created Token Success:: ${tokens}`);

			return {
				code: 201,
				metadata: {
					shop: getInfoData({
						fields: ["_id", "name", "email"],
						object: newShop,
					}),
					tokens: tokens,
				},
			};
		}
	};
}

module.exports = AccessService;
