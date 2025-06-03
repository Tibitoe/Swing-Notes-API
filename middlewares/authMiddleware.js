import { verifyToken } from "../utils/jwt.js";
import ProfileModel from "../models/profileModel.js";

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = verifyToken(token);

    const profile = await ProfileModel.getByUsername(decoded.username);

    if (!profile) {
      return res.status(401).json({ msg: "Invalid Token" });
    }

    req.profile = profile;
    req.profile.id = profile.id;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

export default authenticate;
