import { USERS } from "../constants/user.constants";

export const getUsers = () => {
  return USERS;
};

export const getUserById = (id) => {
  return USERS.find((user) => user.id === id);
};
