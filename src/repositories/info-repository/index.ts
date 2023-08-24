import { Prisma } from '@prisma/client';
import { prisma } from 'config';

async function createUserInfo(data) {
	return prisma.public_infos.create({
		data,
	});
}

// async function updateUserInfo(data: Prisma.public_infosUncheckedUpdateInput) {
// 	return prisma.public_infos.update();
// }

const infoRepository = {
	createUserInfo,
};

export default infoRepository;
