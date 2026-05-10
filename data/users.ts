export const users = {
  validUser: {
    login: process.env.LOGIN!,
    password: process.env.PASSWORD!,
  },

  invalidUser: {
    login: 'wrong_user',
    password: 'wrong_password',
  },
};

export const generateRegisterUser = () => {
  const random = Date.now();

  return {
    login: `test_user_${random}`,
    password: `Password_${random}`,
    firstName: 'Test',
    lastName: 'User',
    email: `test_${random}@mail.com`,
  };
};