
const get = (req, res) => {
    const { db: { banks } } = req;
    res.send(banks.list());
};

const post = (req, res) => {
    const { db: { banks } } = req;
    try {
        const result = banks.create(req.body);
        res.send(result);
    }
    catch(err) {
        res.send('ERROR: ' + err.message);
    }
};

const patch = (req, res) => {
    const { db: { banks } } = req;
    try {
        const result = banks.update({
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
    const { db: { banks } } = req;
    try {
        const result = banks.delete(req.params.id);
        res.send('SUCCESS');
    }
    catch(err) {
        res.send('ERROR: ' + err.message);
    }
};

module.exports = {
    get,
    post,
    patch,
    remove
}
