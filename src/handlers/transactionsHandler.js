
const get = (req, res) => {
    const { db: { transactions } } = req;
    res.send(transactions.list());
};

const getOne = (req, res) => {
    const { db: { transactions } } = req;
    res.send(transactions.get(req.params.id));
}

const post = (req, res) => {
    const { db: { transactions } } = req;
    try {
        const result = transactions.create(req.body);
        res.send(result);
    }
    catch(err) {
        res.send('ERROR: ' + err.message);
    }
};

const patch = (req, res) => {
    const { db: { transactions } } = req;
    try {
        const result = transactions.update({
            id: req.params.id,
            ...req.body
        });
        res.send('SUCCESS');
    }
    catch(err) {
        res.send('ERROR: ' + err.message);
    }
};

const remove = (req, res) => {
    const { db: { transactions } } = req;
    try {
        const result = transactions.delete(req.params.id);
        res.send('SUCCESS');
    }
    catch(err) {
        res.send('ERROR: ' + err.message);
    }
};

module.exports = {
    get,
    getOne,
    post,
    patch,
    remove
}
