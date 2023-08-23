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
const userRepository = {
	createUser,
	findUserByEmail,
};

export default userRepository;
