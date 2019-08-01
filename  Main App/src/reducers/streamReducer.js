import _ from "lodash";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_STREAMS":
      return { ...state, ..._.mapKeys(action.payload, "id") }; //mapKeys to convert array to object.
    case "FETCH_STREAM":
      return { ...state, [action.payload.id]: action.payload };
    case "CREATE_STREAM":
      return { ...state, [action.payload.id]: action.payload };
    case "EDIT_STREAM":
      return { ...state, [action.payload.id]: action.payload };
    case "DELETE_STREAM":
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
