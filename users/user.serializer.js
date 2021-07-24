function prepareUser(user) {
  return {
    email: user.email,
    subscription: user.subscription
  };
}

exports.prepareUser = prepareUser;
