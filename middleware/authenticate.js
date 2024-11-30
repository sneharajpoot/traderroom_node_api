const jwtProvider = require("../config/jwtProvider");
const userService = require("../services/user.service.js");

const authenticate1 = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return req.status(404).send({ message: "token not found" });
    }

    const userId = jwtProvider.getUserIdFromToken(token);
    const user = await userService.findUserById(userId);


    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = authenticate1;
