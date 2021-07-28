const { Conflict, Unauthorized, NotFound } = require("http-errors");
const { UserModel } = require("../users/user.model");
const jwt = require("jsonwebtoken");
const { avatarURL } = require("../users/user.model");

class AuthService {
  async signUp({ username, email, password }) {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict("Email in use");
    }
    const newUser = await UserModel.create({
      username,
      email,
      passwordHash: await UserModel.hashPassword(password),
      avatarURL: await UserModel.avatarURL(email)
    });
    return newUser;
  }

  async logIn({ email, password }) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFound(`User with email '${email}' not found`);
    }

    const isPasswordCorrect = await UserModel.isPasswordCorrect(password, user.passwordHash);
    if (!isPasswordCorrect) {
      throw new Unauthorized("Email or password is wrong");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_AT
    });
    return { user, token };
  }

  async logOut({ _id }) {
    await UserModel.findByIdAndUpdate(_id, { token: null }, { new: true });
  }

  async updateAvatar(req) {
    const { _id } = req.user;
    const { filename } = req.file;
    const updatedAvatar = await UserModel.findByIdAndUpdate(
      _id,
      {
        avatarURL: `http://localhost:4040/avatars/${filename}`
      },
      { new: true }
    );

    if (!updatedAvatar) {
      throw new Unauthorized("Not Authorized");
    }
    return updatedAvatar;
  }
}

exports.authService = new AuthService();
