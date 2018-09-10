import axios from "axios";

export const login = (displayName, id, role) => ({
  type: "LOGIN",
  displayName,
  id,
  role
});

export const startSignup = (displayName, email, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${process.env.API_URI}/users`, {
        displayName,
        email,
        password
      });

      const user = {
        displayName: response.data.displayName,
        id: response.data._id,
        token: response.headers["x-auth"],
        role: response.data.role
      };
      localStorage.setItem("auth", JSON.stringify(user));

      dispatch(
        login(response.data.displayName, response.data._id, response.data.role)
      );
    } catch (e) {
      throw e.response.data.errors;
    }
  };
};

export const startLogin = (email, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${process.env.API_URI}/users/login`, {
        email,
        password
      });

      const user = {
        displayName: response.data.displayName,
        id: response.data._id,
        token: response.headers["x-auth"],
        role: response.data.role
      };
      localStorage.setItem("auth", JSON.stringify(user));

      dispatch(
        login(response.data.displayName, response.data._id, response.data.role)
      );
    } catch (e) {
      throw new Error(e.response.data.error);
    }
  };
};

export const startLogout = () => {
  return async dispatch => {
    try {
      const { token } = JSON.parse(localStorage.getItem("auth"));
      localStorage.removeItem("auth");
      await axios.delete(`${process.env.API_URI}/users/me/token`, {
        headers: {
          "x-auth": token
        }
      });
      dispatch(logout());
    } catch (e) {
      localStorage.removeItem("auth");
      dispatch(logout());
    }
  };
};

export const logout = () => ({
  type: "LOGOUT"
});
