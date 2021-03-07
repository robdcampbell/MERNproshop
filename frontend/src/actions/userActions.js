import { USER_LOGIN_REQUEST } from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // in the headers, we want to send a content-type of: application-json
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post("/api/users/login", {
      email,
      password,
      config,
    });
  } catch (error) {}
};
