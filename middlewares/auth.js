const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
    const decode = jwt.verify(req.headers.token, 'secret_key')
    if (decode) {
        req.user = decode.user;
        next();
    } else {
        res.status(403).json({message: "Invalid Token"})
    }
}

module.exports = {
    checkAuth
}