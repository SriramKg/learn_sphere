const { registerNewUser, loginAUser } = require("../services/users.service");

async function registerUser(req, res) {
  try {
    const { message, status } = await registerNewUser(req.body);
    res.status(status).send({
      message,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error " + error.message,
    });
  }
}

async function loginUser(req, res) {
    try {
      const { message, status, token, role, id} = await loginAUser(req.body);
      res.status(status).send({
        message,
        token,
        role,
        id
      });
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error " + error.message,
      });
    }
  }

module.exports = { registerUser, loginUser };
