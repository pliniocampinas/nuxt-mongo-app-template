import {createServer} from 'http';
import {app} from './app';
// import createSeeds from './seeders/createSeeds';
import * as mongoose from 'mongoose';

const port = process.env.PORT || 3000;

(async () => {

  // Connect to MongoDB
  mongoose
  .connect('mongodb://mongo:27017/docker-node-mongo')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

  // if (process.env.NODE_ENV !== 'production') {
  //   await createSeeds()
  // }

  createServer(app)
    .listen(
      port,
      () => console.info(`Server running on port ${port}`)
    );
})();