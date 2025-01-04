async function validateUser(req, res, next) {
    if(req.userInfo.role === "instructor"){
        next();
    } else {
        return res.status(403).send({
            message: 'Forbidden. You are not authorized to do this action.',
        });
    }
}

module.exports = validateUser;