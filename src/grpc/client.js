const PROTO_PATH = __dirname + '/protos/users.proto';

const parseArgs = require('minimist');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

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
    const argv = parseArgs(process.argv.slice(2), {
        string: 'target'
    });
    let target;

    if (argv.target) {
        target = argv.target;
    } else {
        target = 'localhost:50051';
    }

    const client = new usersProto.Users(target,
        grpc.credentials.createInsecure());

    let user;
    if (argv._.length > 0) {
        user = argv._[0];
    } else {
        user = 'world';
    }

    client.getAllUsers({}, (err, response) => {
      console.log(response);
    });

    client.getUser({ id: 'ry6qKDccw' }, (err, response) => {
      console.log(response);
    });

    client.createUser({
        "name": "Jim Morrison",
        "bankId": "rypNYv5qD",
        "amount": "9998800"
    }, (err, response) => {
        console.log(response);
    });

    client.updateUser({
        "id": "HyvWtCyfu",
        "bankId": "rypNYv5qD",
        "amount": "9998800"
    }, (err, response) => {
        console.log(response);
    });

    client.deleteUser({ id: 'SyQa5Ryf_'}, (err, response) => {
        console.log(response);
    })
}

main();
