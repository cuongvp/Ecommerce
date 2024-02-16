const shopModel = require("../models/shop.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { BadRequestError, AuthFailureError } = require("../core/error.response");
const { findByEmail } = require("./shop.service");

const roleShop = {
	SHOP: "SHOP",
	WRITER: "WRITER",
	EDITER: "EDITER",
	ADMIN: "ADMIN",
};

class AccessService {

	/*
		1) check email
		2) match password
		3) create AT vs RF and save
		4) generate tokens
		5) get data and return login
	*/
	static login = async ({email, password, refreshToken = null}) => {
		// 1
		const foundShop = await findByEmail({ email })

		if(!foundShop){
			throw new BadRequestError('Shop is not registerd!')
		}
		// 2
		const match = bcrypt.compare(password, foundShop.password)

		if(!match){
			throw new AuthFailureError('Authentication Error!')
		}
		// 3
		// const privateKey = crypto.randomBytes(64).toString('hex')
		// const publicKey = crypto.randomBytes(64).toString('hex')

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

		// 4

		const tokens = await createTokenPair(
			{
				userId: foundShop._id, 
				email: foundShop.email,
			},
			publicKey,
			privateKey
		);

		await KeyTokenService.createKeyToken({
			userId: foundShop._id,
			refreshToken: tokens.refreshToken,
			publicKey,
			privateKey
		})

		return {
		
			shop: getInfoData({
				fields: ["_id", "name", "email"],
				object: foundShop,
			}),
			tokens: tokens,
			
		};
	}

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

			// const publicKeyString = await KeyTokenService.createKeyToken({
			// 	userId: newShop._id,
			// 	publicKey: publicKey,
			// });

			// if (!publicKeyString) {
			// 	return {
			// 		code: "publicKeyString xxx",
			// 		message: "publicKey error",
			// 	};
			// }

			// create token pair
			const tokens = await createTokenPair(
				{
					userId: newShop._id,
					email,
				},
				publicKey,
				privateKey
			);

			console.log(`Created Token Success::`);

			const publicKeyString = await KeyTokenService.createKeyToken({
				userId: newShop._id,
				publicKey,
				privateKey,
				refreshToken: tokens.refreshToken
			});

			if (!publicKeyString) {
				return {
					code: "publicKeyString xxx",
					message: "publicKey error",
				};
			}

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
