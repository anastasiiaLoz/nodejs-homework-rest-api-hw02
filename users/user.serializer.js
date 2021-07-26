function prepareUser(user) {
  return {
    email: user.email,
    subscription: user.subscription,
    avatarURL: user.avatarURL
  };
}

exports.prepareUser = prepareUser;
