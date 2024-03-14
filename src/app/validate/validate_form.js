function validatePhoneNumber(phoneNumber) {
  //following theformat of Vietnam telco (Viettel, Vinaphone, Mobifone)
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phoneNumber);
}

function validatePassword(password) {
  //  Minimum 9 characters
  //  Have at least 1 number
  //  Have at least 1 upper char
  //  Have at least 1 lower char
  //  Have at least an special chars like (!@#$%^&*)
  const regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{9,}$/;
  return regex.test(password);
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
}

function validateUserName(userName) {
  // contains at least 6 and maximum 30 characters from a-z
  // must not contain any special characters or spaces
  const regex = /^[a-zA-Z0-9]{5,27}$/;
  return regex.test(userName);
}

export {
  validatePhoneNumber,
  validatePassword,
  validateEmail,
  validateUserName,
};
