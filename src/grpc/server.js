const PROTO_PATH = __dirname + '/protos/users.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const db = require('../db');
const { createHandlers } = require('./handlers');

const host = '0.0.0.0';
const port = '50051';

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

const handlers = createHandlers(db);

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
const main = () => {
    const server = new grpc.Server();

    server.addService(usersProto.Users.service, handlers);

    console.log(`Starting server at ${host}:${port} ...`);

    server.bindAsync(`${host}:${port}`, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log(`Server started!`);
    });
}

main();
