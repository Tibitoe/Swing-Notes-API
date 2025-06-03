import ProfileModel from "../models/profileModel.js";
import bcrypt from "bcrypt";

const ProfileService = {
  ensureUnique: async function (username, email) {
    const profiles = await ProfileModel.getAll();

    const existingUser = profiles.find(
      (profile) => profile.username === username || profile.email === email
    );

    if (existingUser) {
      return false;
    }

    return true;
  },

  create: async function (username, email, password_hash) {
    const profile = await ProfileModel.create(username, email, password_hash);
    return profile;
  },

  login: async function (username, password) {
    const profile = await ProfileModel.getByUsername(username);

    if (profile && (await bcrypt.compare(password, profile.password_hash))) {
      return profile;
    }

    return null;
  },
};

export default ProfileService;
