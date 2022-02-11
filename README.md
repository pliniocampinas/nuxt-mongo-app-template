
<h1> Nuxt Mongo App Template </h1>

Goal: Build a complete template for a production ready full stack web app

Mongo Node api came from: 

https://github.com/bradtraversy/docker-node-mongo

# Run in Docker
docker-compose up
# use -d flag to run in background

# Tear down
docker-compose down

# To be able to edit files, add volume to compose file
volumes: ['./:/usr/src/app']

# To re-build
docker-compose build