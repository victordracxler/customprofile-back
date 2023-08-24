import { public_users } from '@prisma/client';
import infoRepository from 'repositories/info-repository';
import userRepository from 'repositories/users-repository';

import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

async function getInfo(userId: number) {
	try {
		const userInfo = await infoRepository.getUserInfo(userId);
		const userEmail = await userRepository.getEmailByUserId(userId);

		const allInfo = { ...userInfo, ...userEmail };
		return allInfo;
	} catch (error) {
		console.log(error);
	}
}
async function createInfoOnSignUp(user: public_users) {
	const { id, name } = user;

	const spacePosition = name.indexOf(' ');
	const firstName = name.substring(0, spacePosition);
	const lastName = name.substring(spacePosition + 1);

	const data = {
		firstName,
		lastName,
		userId: id,
	};

	try {
		const createUserInfo = await infoRepository.createUserInfo(data);
	} catch (error) {
		console.log(error);
	}
}

async function updateUserInfoService(data, userId: number) {
	const { body, image } = data;
	const { firstName, lastName, bio, linkedinUrl, twitterUrl, instagramUrl } =
		body;

	try {
		const imageUrl = await uploadImageToCloudinary(image);

		const newInfo = {
			imageUrl,
			firstName,
			lastName,
			bio,
			linkedinUrl,
			twitterUrl,
			instagramUrl,
		};

		const infoId = await infoRepository.findIdByUserId(userId);

		const updated = await infoRepository.updateUserInfo(newInfo, infoId.id);
		return updated;
	} catch (error) {
		console.log(error);
	}
}

async function uploadImageToCloudinary(image) {
	let imageUrl = '';

	await cloudinary.uploader.upload(
		image.path,
		{ public_id: new Date() + image.originalname, width: 250 },
		function (error, result) {
			imageUrl = result.secure_url;
		}
	);
	fs.unlink(image.path, (err) => {
		if (err) throw err;
	});
	return imageUrl;
}

const infoService = {
	getInfo,
	createInfoOnSignUp,
	updateUserInfoService,
};

export default infoService;
