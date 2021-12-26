import axios from "axios";
import lodash from "lodash";

const getLogin = async (email, password) => {
  await axios.post("/api/auth/login", { email, password });
  const result = await axios.get("/api/user/current");
  const userData = lodash.omit(
    result.data,
    "followers",
    "following",
    "isAdmin",
    "updatedAt"
  );
  console.log(userData);
  //omit followers, following, isAdmin, updatedAt, createdAt
  return { id: userData._id, ...lodash.omit(userData, "_id") };
};

export default getLogin;
