import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { update } from "../features/user";
import lodash from "lodash";

function useUpdateUser(dependency, setError) {
  const dispatch = useDispatch();

  useEffect(() => {
    const updateUser = async () => {
      try {
        const res = await axios.get("/api/user/current");
        const userData = lodash.omit(
          res.data,
          "followers",
          "following",
          "isAdmin",
          "updatedAt"
        );
        dispatch(update({ id: userData._id, ...lodash.omit(userData, "_id") }));
      } catch (error) {
        console.error(error);
        setError(String(error));
      }
    };
    updateUser();
  }, [dependency]);
}

export default useUpdateUser;
