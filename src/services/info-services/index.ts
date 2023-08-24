import { Prisma, public_infos, public_users } from '@prisma/client';
import infoRepository from 'repositories/info-repository';
import userRepository from 'repositories/users-repository';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

import sharp from 'sharp';

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
	console.log(data);

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

		console.log('a url da imagem ', imageUrl);

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
		{ public_id: image.originalname },
		function (error, result) {
			console.log(result);
			imageUrl = result.secure_url;
		}
	);
	return imageUrl;
}

const infoService = {
	getInfo,
	createInfoOnSignUp,
	updateUserInfoService,
};

export default infoService;
