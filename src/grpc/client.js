const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/protos/users.proto';
const server = {
  host: 'localhost',
  port: '50051'
};

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const usersProto = grpc.loadPackageDefinition(packageDefinition).users;

const main = () => {
    const { host, port } = server;
    const target = `${host}:${port}`;

    const client = new usersProto.Users(target,
        grpc.credentials.createInsecure());

    client.getUser({ id: 'ry6qKDccw' }, (err, response) => {
       console.log(err || response);
    });
}

main();
