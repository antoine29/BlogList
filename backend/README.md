# Backend BlogList
A NodeJs based application. Developed using tools like:
- APIREST
- Express
- Mongo DB
- Mongoose

Explore the endpoints/requests checking or importing (into Postman or Insomnia) the `Insomnia.json` file.

## Running in console
A mongo db instance is required. The fastest way to get one is by launching a docker container.
```console
$ docker run -d -p 27017:27017 --name mongo --rm \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=password \
    mongo
```
An `.env` file is required to set some project settings. Fill the file fields propperly. Then, install de project dependencies and run the application
```console 
$ npm i
$ npm run dev
```
Check the code lint with:
```console
$ npm run lint
```
There is a set of unitests and integration tests, run them with:
```console
$ npm run test
```
Aditionally, you can run the `devTestData.js` file to set some testing users/blogs
```console
$ node devTestData.js
```

## Running as a docker container
Build the project image with 
```console
$ docker build . -t bloglist-backend
```
An `.env.container` file is required, but be aware the project code should be able to reach the mongo db instance from within the container. Assuming you're still working with the previous mongo db docker container, the `MONGODB_URI` field would look as:
```
MONGODB_URI='mongodb://admin:password@host.docker.internal:27017'
```
And you would run the container with:
```console
$ docker run -it -p 3001:3001 --name bloglist-backend --rm \
    --add-host=host.docker.internal:host-gateway \
    --env-file .env.container \
    bloglist-backend
```
