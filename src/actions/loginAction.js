import axios from "axios";

export const loginAction = (email, password) => (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });
  axios
    .post("http://localhost:5000/user/login", { email, password })
    .then((result) => {
      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      console.log(result.data.token, "ali hesham ajajajajkajajkajk");
      localStorage.setItem("userInfo", JSON.stringify(result.data));
    })
    .catch((error) => {
      dispatch({ type: "LOGIN_FAIL", payload: error });
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "LOGOUT" });
};

export const RegisterAction = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST" });
    const { data } = await axios.post("http://localhost:5000/user/register", {
      name,
      email,
      password,
    });
    dispatch({ type: "REGISTER_SUCCESS", payload: data });
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    if (data.token) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    } else {
      console.log(data);
    }
  } catch (error) {
    dispatch({ type: "REGISTER_FAIL", payload: error });
    console.log(error, "ali hesham from actio");
  }
};

export const GetDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DETAILS_REQUEST" });
    const { data } = await axios.get("http://localhost:5000/profile/" + id);
    dispatch({ type: "DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DETAILS_FAIL", payload: error });
  }
};
export const UpdateAction = (id, values) => (dispatch) => {
  dispatch({ type: "UPDATE_REQUEST" });
  axios
    .put("http://localhost:5000/update/" + id, values)
    .then((result) => {
      dispatch({ type: "UPDATE_SUCCESS", payload: result.data });
      console.log(result.data, "ali hesham details action");
    })
    .catch((error) => {
      dispatch({ type: "UPDATE_FAIL", payload: error });
    });
};
export const GetAllUsersAction = () => async (dispatch) => {
  dispatch({ type: "GET_ALLUSERS_REQUEST" });
  const { data } = await axios.get("http://localhost:5000/allUsers");
  dispatch({ type: "GET_ALLUSERS_SUCCESS", payload: data });
};
export const DeleteUserAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_USER_REQUEST" });
    const { data } = await axios.delete(
      "http://localhost:5000/deleteUser/" + id
    );
    dispatch({ type: "DELETE_USER_SUCCESS" });
  } catch (error) {
    dispatch({ type: "DELETE_USER_FAIL", payload: error });
  }
};
export const EditUserAdminAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_EDIT_USER_REQUEST" });
    const { data } = await axios.get(
      "http://localhost:5000/editUserAdmin/" + id
    );
    dispatch({ type: "ADMIN_EDIT_USER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "ADMIN_EDIT_USER_FAIL", payload: error });
  }
};

export const UpdateUserAdminAction = (id, values) => (dispatch) => {
  dispatch({ type: "ADMIN_UPDATE_USER_REQUEST" });
  axios
    .put("http://localhost:5000/adminUpdate/" + id, values)
    .then((result) => {
      dispatch({ type: "ADMIN_UPDATE_USER_SUCCESS", payload: result.data });
    });
};
