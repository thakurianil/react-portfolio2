import React from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { useDispatch } from "react-redux";
import { setMenu } from "../../features/user/userSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  dispatch(setMenu("Dashboard"));
  return (
    <UserLayout pageTitle="Dashboard">
      <h1>main area</h1>
    </UserLayout>
  );
};

export default Dashboard;
