import axios from "axios";

// Verify user before entering route
export const verifyUser = async (username) => {
  try {
    const response = await axios.get(`/${username}`);

    if (response.data.status === "false") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

// Set cookies
export function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Get Cookies
export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
