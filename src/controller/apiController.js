const testApi = (req, res) => {
    return res.status(200).json({
        messsage: 'ok',
        data: 'test api'
    });
};
module.exports = {
    testApi
};