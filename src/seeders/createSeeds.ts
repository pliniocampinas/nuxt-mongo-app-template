import createRootUser from './createRootUser';

const createSeeds = async () => {
  await createRootUser()
}

export default createSeeds