const removePasswordFromUserRes = (user) => {
  const { password, ...newUser } = user._doc;

  return newUser;
};

module.exports = { removePasswordFromUserRes };
