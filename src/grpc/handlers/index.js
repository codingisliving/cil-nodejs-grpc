const { createUsersHandler } = require('./usersHandler');

const createHandlers = (db) => {
    return {
        ...createUsersHandler(db)
    }
};

module.exports = {
    createHandlers
};
