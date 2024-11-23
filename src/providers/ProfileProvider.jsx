import { ProfileReducer, initialState } from "../reducers/ProfileReducer";
import { ProfileContext } from "../context";
import { useReducer } from "react";

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProfileReducer, initialState);
  const value = { state, dispatch };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;
