import axios from "axios";
import { use } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOut } = use(AuthContext);
  const navigate = useNavigate();
  axiosInstance.interceptors.request.use((config) => {
    if (user?.accessToken) {
      config.headers.authorization = `Bearer ${user.accessToken}`;
      config.headers.email = user.email;
    }
    return config;
  });

  // response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.status === 401 || error.status === 403) {
        logOut();
        navigate("/login")
          .then(() => {
            toast.error("Please sign in again", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          })
          .catch((err) => {
            if (err) {
              alert("contact admin");
            }
          });
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosSecure;
