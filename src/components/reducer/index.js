export const initialState = {
  user: null,
  displayName: null,
};

export const SETUSER = "SET_USER";

export const reducer = (state, action) => {
  switch (action.type) {
    case SETUSER:
      return {
        ...state,
        user: action.user,
        displayName: action.displayName,
      };

    default:
      return state;
  }
};
