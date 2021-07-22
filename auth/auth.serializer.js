const { prepareUser } = require("../users/user.serializer");

function prepareUserWithToken(userWithToken) {
  return {
    token: userWithToken.token,
    user: prepareUser(userWithToken.user)
  };
}

exports.prepareUserWithToken = prepareUserWithToken;
