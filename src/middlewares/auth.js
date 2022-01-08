const jwt = require('jsonwebtoken');
const get_account_data = require("../services/get_account_data");

function cookieHandle(cookie, next) {
    if (!cookie) {
        const err = new Error()
        err.status = 400;
        err.name = "Bad request"
        err.message = "Invalid access to specific url"
        return next(err);
    }

    if (!cookie["jwt"]) {
        const err = new Error();
        err.name = 'Unauthorized'
        err.status = 401;
        return next(err);
    }

    const token = cookie["jwt"]
    const data = jwt.verify(token, Bv7Y8mnscuKv5P7Tqp9gEraA8yg7gSquRP6Tg4Fz3LdNu9LV);

    if (!data) {
        const err = new Error('Unauthorized');
        err.status = 401;
        return next(err);
    }

    return data
}

async function auth(req, res, next) {
    try {
        const data = cookieHandle(req.cookies, next)
        req.user_profile = await get_account_data(data._id);
        return next();
    } catch (error) {
        return next(error);
    }
}

async function auth_quick(req, res, next) {
    try {
        req.client_data = cookieHandle(req.cookies, next);
        req.client_id = req.client_data._id
        return next();
    } catch (error) {
        return next(error);
    }
}

module.exports = {auth, auth_quick};