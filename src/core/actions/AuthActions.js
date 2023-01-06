/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { toast } from "react-toastify";
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_EMAIL_CHANGED,
  LOGIN_PASSWORD_CHANGED,
  LOGOUT_USER,
} from "./Types";
import RequestEngine from "../../core/RequestEngine";

const request = new RequestEngine();
function loginUserSuccess(dispatch, user, navigate) {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: {
      user,
      token: user.access_token,
      isAdmin: user.data.isAdmin,
    },
  });
  toast.success("Login Success!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  navigate("/dashboards/sales");
}

function loginUserFailure(dispatch, error) {
  dispatch({
    type: LOGIN_USER_FAILURE,
    payload: error,
  });
}
export const signinUser = (user, navigate) => (dispatch) => {
  dispatch({ type: LOGIN_USER });
  request
    .login(user.email, user.password)
    .then((users) => {
      localStorage.setItem("user", JSON.stringify(users.data));
      localStorage.setItem("token", JSON.stringify(users.data.access_token));
      loginUserSuccess(dispatch, users.data, navigate);
    })
    .catch((error) => {
      loginUserFailure(dispatch, error);
    });
};

/**
 * Signup user success
 */
// function signupUserSuccess(dispatch, user, history) {
//   dispatch({
//     type: SIGNUP_USER_SUCCESS,
//     payload: user,
//   });
//   history.push("/app/dashboard/dashboard1");
//   NotificationManager.success("Account Created");
// }

// /**
//  * Signup user failure
//  */
// function signupUserFailure(dispatch, error) {
//   dispatch({
//     type: SIGNUP_USER_FAILURE,
//     payload: error,
//   });
//   NotificationManager.error(error.message);
// }

/**
 * Function to detect email changes
 */
export function onEmailChanged(email) {
  return {
    type: LOGIN_EMAIL_CHANGED,
    payload: email,
  };
}

export function onPasswordChanged(password) {
  return {
    type: LOGIN_PASSWORD_CHANGED,
    payload: password,
  };
}

export const logOutUser = (navigate) => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
  localStorage.removeItem("user");
  localStorage.removeItem("persist:root");
  navigate("/authentication/sign-in/");
};
