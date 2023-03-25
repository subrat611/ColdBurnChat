import { createContext, useContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  readCollectionFromFirestoreBasedOnId,
  createUserInformationInFireStore,
} from "../../firebase";
import { initialState, reducer, SETUSER } from "../reducer";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = [state, dispatch];

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setUserInfo(user);
    });
    return unsubscribe;
  }, []);

  const setUserInfo = async (user) => {
    if (user) {
      const docSnap = await readCollectionFromFirestoreBasedOnId(
        "rooms",
        user.uid
      );
      if (docSnap.exists()) {
        dispatch({
          type: SETUSER,
          user: user,
          displayName: docSnap.data().name,
          status: docSnap.data().status,
        });
      }
    }
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useStateValue = () => useContext(UserContext);
