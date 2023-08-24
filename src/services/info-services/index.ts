import { Prisma, public_infos, public_users } from '@prisma/client';
import infoRepository from 'repositories/info-repository';
import userRepository from 'repositories/users-repository';

async function getInfo(token: string) {
	// const userExists = await userRepository.findUserByEmail(params.email);
	// if (userExists) {
	// 	throw {
	// 		name: 'ConflictError',
	// 		message: 'This email is already signed up',
	// 	};
	// }
	// // await userRepository.createUser();
	// return;
}
async function createInfoOnSignUp(user) {
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

const infoService = {
	getInfo,
	createInfoOnSignUp,
};

export default infoService;
