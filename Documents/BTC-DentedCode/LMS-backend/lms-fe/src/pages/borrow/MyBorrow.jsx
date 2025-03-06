import React, { useEffect } from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import BurrowList from "./BurrowList";
import { useDispatch } from "react-redux";
import { getMyBorrowListAction } from "../../features/borrow/borrowAction";
import { setMenu } from "../../features/user/userSlice";

const MyBorrow = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMenu("My Books"));
    dispatch(getMyBorrowListAction());
  }, []);

  return (
    <UserLayout pageTitle={"My Borrowed Book"}>
      <BurrowList />
    </UserLayout>
  );
};

export default MyBorrow;
