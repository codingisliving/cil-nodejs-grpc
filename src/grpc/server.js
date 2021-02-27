const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const db = require('../db');
const { createUsersHandler } = require('./handlers');

const host = '0.0.0.0';
const port = '50051';
const PROTO_PATH = __dirname + '/protos/users.proto';

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const usersProto = grpc.loadPackageDefinition(packageDefinition).users;

/**
 * Starts an RPC server
 */
const main = () => {
    const server = new grpc.Server();

    server.addService(usersProto.Users.service, createUsersHandler(db));

    console.log(`Starting server at ${host}:${port} ...`);

    server.bindAsync(`${host}:${port}`, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log(`Server started!`);
    });
}

main();
