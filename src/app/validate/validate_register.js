import { toast } from "react-toastify";
import {
  validateUserName,
  validatePassword,
  validatePhoneNumber,
  validateEmail,
} from "./validate_form.js";
function validateRegister(formData) {
  if (!validateUserName(formData.userName)) {
    toast.error("Invalid username");
    return;
  }
  if (!validatePassword(formData.password)) {
    toast.error("Invalid password");
    return;
  }
  if (!validatePhoneNumber(formData.phoneNumber)) {
    toast.error("Invalid phoneNumber");
    return;
  }
  if (!validateUserName(formData.shopName)) {
    toast.error("Invalid shopName");
    return;
  }
  if (!validateEmail(formData.email)) {
    toast.error("Invalid email");
    return;
  }
  if (formData.password !== formData.confirmPassword) {
    toast.error("Password and confirm password do not match");
    return;
  }
  return true;
}

export { validateRegister };
