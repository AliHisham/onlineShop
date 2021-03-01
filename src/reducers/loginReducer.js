export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { loading: true };
    case "LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "LOGOUT":
      return {};

    default:
      return state;
  }
};

export const RegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return { loading: true };
    case "REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "REGISTER_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const GetUserDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "DETAILS_REQUEST":
      return { loading: true, ...state };
    case "DETAILS_SUCCESS":
      return { loading: false, user: action.payload };
    case "DETAILS_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const UpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { loading: true };
    case "UPDATE_SUCCESS":
      return { loading: false, success: true, userInfo: action.payload };
    case "UPDATE_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
