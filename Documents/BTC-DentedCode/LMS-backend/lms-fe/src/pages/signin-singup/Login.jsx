import React, { useEffect, useRef } from "react";
import { CustomInput } from "../../components/customInput/CustomInput";
import { Button, Col, Row, Form } from "react-bootstrap";
import { loginUser } from "../../features/user/userAxios";
import { userSignInAction } from "../../features/user/userAction";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const emailRef = useRef("");
  const passRef = useRef("");

  // location
  const location = useLocation();
  const navigate = useNavigate();

  // to handle return location
  const { user } = useSelector((state) => state.userInfo);
  const sendTo = location?.state?.from?.location?.pathname || "/dashboard";

  useEffect(() => {
    user?._id && navigate(sendTo);
  }, [user?._id, navigate, sendTo]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;

    if (!email || !password) {
      return toast.error("Both field must be filled");
    }

    // const responsePendig = loginUser({ email, password });
    // toast.promise(responsePendig, {
    //   pending: "Please wait....",
    // });

    // const { status, message } = await responsePendig;

    // toast[status](message);

    dispatch(userSignInAction({ email, password }));
  };

  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      placeholder: "Sam@email.com",
      inputRef: emailRef,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      placeholder: "*******",
      inputRef: passRef,
    },
  ];

  return (
    <div>
      <Row>
        <Col>
          <Form
            onSubmit={handleOnSubmit}
            className="shadow-lg border p-5 rounded  m-auto mt-4"
            style={{ width: "450px" }}
          >
            <h1>Welcome back!</h1>
            <hr />
            {inputs.map((input, i) => (
              <CustomInput key={i} {...input} />
            ))}

            <div className="d-grid">
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
