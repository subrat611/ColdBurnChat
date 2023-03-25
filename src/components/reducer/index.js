export const initialState = {
  user: null,
  displayName: null,
  status: null,
};

export const SETUSER = "SET_USER";

export const reducer = (state, action) => {
  switch (action.type) {
    case SETUSER:
      return {
        ...state,
        user: action.user,
        displayName: action.displayName,
        status: action.status,
      };

    default:
      return state;
  }
};
