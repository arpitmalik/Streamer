import axios from "../apis/streams";
import { toast } from "react-toastify";
import history from "../history";

// Google Sign in
export const signIn = userId => {
  return {
    type: "SIGN_IN",
    payload: userId
  };
};

// Google Sign out
export const signOut = () => {
  return {
    type: "SIGN_OUT"
  };
};

// Create Stream
export const createStream = formValues => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth; // getState is used to fetch values from redux store.
    if (userId !== null) {
      const response = await axios.post("/streams", { ...formValues, userId });
      dispatch({
        type: "CREATE_STREAM",
        payload: response.data
      });
      toast.success("Your stream was created.");
      history.push("/");
    } else toast.error("Please sign in.");
  };
};

// Fetch stream list
export const fetchStreams = () => {
  return async dispatch => {
    const response = await axios.get("/streams");
    dispatch({
      type: "FETCH_STREAMS",
      payload: response.data
    });
  };
};

// Fetch single stream
export const fetchStream = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/streams/${id}`);
      dispatch({
        type: "FETCH_STREAM",
        payload: response.data
      });
    } catch (error) {
      toast.error(`There is no post with such ID`);
      history.push("/");
    }
  };
};

// Edit a stream
export const editStream = (id, formValues) => {
  return async dispatch => {
    try {
      const response = await axios.patch(`streams/${id}`, formValues);
      dispatch({
        type: "EDIT_STREAM",
        payload: response.data
      });
      toast.success("Your stream was edited.");
      history.push("/");
    } catch (error) {
      toast.error(error);
      history.push("/");
    }
  };
};

// Delete a stream
export const deleteStream = id => {
  return async dispatch => {
    try {
      await axios.delete(`/streams/${id}`);
      dispatch({
        type: "DELETE_STREAM",
        payload: id
      });
      toast.success("Your stream was deleted.");
      history.push("/");
    } catch (error) {
      toast.error(error);
      history.push("/");
    }
  };
};
