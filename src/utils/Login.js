import axios from "axios";

const getLogin = async (email, password) => {
  await axios.post("/api/auth/login", { email, password });
  const result = await axios.get("/api/user/current");
  const userData = result.data;
  const { _id, username, profilePicture, firstName, lastName } = userData;
  return { id: _id, username, email, profilePicture, firstName, lastName };
};

export default getLogin;
