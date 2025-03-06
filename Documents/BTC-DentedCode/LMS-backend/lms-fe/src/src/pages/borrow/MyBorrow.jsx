import React, { useEffect } from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { MyBorrowTable } from "../../components/tables/MyBorrowTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchBorrowsAction } from "../../features/borrow/borrowAction";
import { setMenu } from "../../features/user/userSlice";

const MyBorrow = () => {
  const dispatch = useDispatch();
  dispatch(setMenu("My Books"));

  const { borrows } = useSelector((state) => state.borrowInfo);
  useEffect(() => {
    dispatch(fetchBorrowsAction());
  }, [dispatch]);
  return (
    <UserLayout pageTitle={"My borrow list"}>
      <MyBorrowTable borrows={borrows} />
    </UserLayout>
  );
};

export default MyBorrow;
