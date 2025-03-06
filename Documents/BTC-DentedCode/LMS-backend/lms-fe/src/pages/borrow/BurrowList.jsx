import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { returnBookAction } from "../../features/borrow/borrowAction";

const BurrowList = () => {
  const dispatch = useDispatch();
  const { borrows } = useSelector((store) => store.borrowInfo);

  const handleOnReturn = (id) => {
    alert("DISPATCH RETURN ACTION For : " + id);
    dispatch(returnBookAction(id));
  };

  return (
    <div>
      <table className="border">
        <tbody>
          {borrows.map((item, index) => {
            return (
              <tr>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2"> {item.bookTitle}</td>
                <td className="border p-2">
                  {item.isReturned ? (
                    "Already Returned "
                  ) : (
                    <Button
                      onClick={() => {
                        handleOnReturn(item._id);
                      }}
                    >
                      Return
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BurrowList;
