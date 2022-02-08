import User from '../models/User';
import { generateHash } from '../utilities/encryptionUtils'

const createRootUser = async () => {
  await User.create({
    email: 'plinio.lsc@gmail.com',
    password: await generateHash('plinio123', 10),
    username : 'plinio',
    birthDate : new Date("1994-12-18"),
    accessLevel: 10,
  })
}

export default createRootUser