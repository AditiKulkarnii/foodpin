import axios from "axios";

export const getUser = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

export const login = async (email, password) => {
  const { data } = await axios.post(
    "api/users/login",
    { email, password }
  );
  localStorage.setItem(
    "user",
    JSON.stringify(data)
  );
  return data;
};

export const register = async (registerData) => {
  const { data } = await axios.post(
    "api/users/register",
    registerData
  );
  console.log(data);
  localStorage.setItem(
    "user",
    JSON.stringify(data)
  );
  return data;
};

export const logout = () => {
  localStorage.removeItem("user");
  // localStorage.removeItem('cart');
  document.title = "FOOD MINE ! ";
};

export const updateProfile = async (user) => {
  const { data } = await axios.put(
    "api/users/updateProfile",
    user
  );
  // console.log(data);
  localStorage.setItem(
    "user",
    JSON.stringify(data)
  );
  return data;
};

export const changePassword = async (
  password
) => {
  await axios.put(
    "api/users/changePassword",
    password
  );
};

export const getAll = async (searchTerm) => {
  const { data } = await axios.get(
    "api/users/getAll/" + (searchTerm ?? " ")
  );

  return data;
};

export const UserStatus = async (userId) => {
  console.log(userId);
  const { data } = await axios.put(
    "api/users/status/" + userId
  );
  console.log(data);
  return data;
};

export const getById = async (userId) => {
  console.log(userId);
  const { data } = await axios.get(
    "api/users/getById/" + userId
  );

  return data;
};

export const updateUser = async (userData) => {
  const { data } = await axios.put(
    "api/users/update",
    userData
  );
  return data;
};
