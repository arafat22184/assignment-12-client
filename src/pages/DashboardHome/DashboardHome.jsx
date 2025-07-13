import React from "react";
import useUserRole from "../../Hooks/useUserRole";
import AdminDashboardHome from "./AdminDashboardHome";
import Loading from "../../Shared/Loading";
import MemberDashboardHome from "./MemberDashboardHome";
import TrainerDashboardHome from "./TrainerDashboardHome";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <Loading></Loading>;
  }

  if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  }
  if (role === "member") {
    return <MemberDashboardHome></MemberDashboardHome>;
  }
  if (role === "trainer") {
    return <TrainerDashboardHome></TrainerDashboardHome>;
  }
};

export default DashboardHome;
