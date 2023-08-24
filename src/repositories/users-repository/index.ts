import { Prisma } from '@prisma/client';
import { prisma } from 'config';

async function createUser(data: Prisma.public_usersCreateInput) {
	return prisma.public_users.create({
		data,
	});
}

async function findUserByEmail(email: string) {
	return prisma.public_users.findUnique({
		where: {
			email,
		},
	});
}

async function getEmailByUserId(userId: number) {
	return prisma.public_users.findUnique({
		select: {
			email: true,
		},
		where: {
			id: userId,
		},
	});
}

async function updateEmailByUserId(id: number, newEmail: string) {
	return prisma.public_users.update({
		where: {
			id: id,
		},
		select: {
			email: true,
		},
		data: {
			email: newEmail,
		},
	});
}
const userRepository = {
	createUser,
	findUserByEmail,
	getEmailByUserId,
	updateEmailByUserId,
};

export default userRepository;
