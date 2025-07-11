import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllTrainersHome = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: trainer = [] } = useQuery({
    queryKey: ["trainer-by-id", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainer/${id}`);
      return res.data;
    },
  });
  console.log(trainer);
  return <div></div>;
};

export default AllTrainersHome;
