import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../reducer";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </UserContext.Provider>
  );
};

export const useStateValue = () => useContext(UserContext);
