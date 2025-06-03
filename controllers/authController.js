import ProfileService from "../services/profileService.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
import { validate } from "../middlewares/validationMiddleware.js";
import { registerSchema, loginSchema } from "../validators/AuthValidator.js";

const authController = {
  register: [
    validate(registerSchema),
    async (req, res) => {
      try {
        const { username, email, password } = req.body;

        if (!(email && password && username)) {
          res.status(400).send("All input is required");
        }

        if (!(await ProfileService.ensureUnique(username, email))) {
          return res
            .status(409)
            .send("User already exists, try logging in instead.");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const profile = await ProfileService.create(
          username,
          email,
          encryptedPassword
        );

        const token = generateToken({
          username: profile.username,
          profileId: profile.id,
        });

        profile.token = token;

        res.status(201).json(profile);
      } catch (err) {
        console.log(err);
      }
    },
  ],

  login: [
    validate(loginSchema),
    async (req, res) => {
      try {
        const { username, password } = req.body;

        if (!(username && password)) {
          res.status(400).send("All input is required");
        }

        const profile = await ProfileService.login(username, password);

        if (profile) {
          const token = generateToken({
            username: profile.username,
            profileId: profile.id,
          });

          profile.token = token;

          return res.status(200).json(profile);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
    },
  ],
};

export default authController;
