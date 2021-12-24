import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/user";

function useUpdateUser(dependency, setError) {
  const dispatch = useDispatch();

  useEffect(() => {
    const updateUser = async () => {
      try {
        const res = await axios.get("/api/user/current");
        const { _id, email, username, profilePicture, firstName, lastName } =
          res.data;
        const payload = {
          id: _id,
          username,
          email,
          profilePicture,
          firstName,
          lastName,
        };
        dispatch(login(payload));
      } catch (error) {
        console.error(error);
        setError(String(error));
      }
    };
    updateUser();
  }, [dependency]);
}

export default useUpdateUser;
