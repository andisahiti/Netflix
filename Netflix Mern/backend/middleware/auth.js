const HttpError = require("../models/http-error");
const JWT = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //qita gjithqysh duhet me bo se borwserat vet ja qesin
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new HttpError('auth failed', 403)
        }

        //to verify it (token,the private key)
        const decodedToken = JWT.verify(token, 'supersecret_do_not_share');
        req.userData = { userId: decodedToken.userId };
        next();


    } catch (error) {
        return next(new HttpError('Authentication failed', 401))

    }
}