import React, { useState } from "react";
// import { DefaultLayout } from "../../components/layout/DefaultLayout";
import { Row, Col, Form, Button } from "react-bootstrap";
import { CustomInput } from "../../components/customInput/CustomInput";

import { toast } from "react-toastify";
import { postNewUser } from "../../features/user/userAxios";
import { useNavigate } from "react-router-dom";
// import { postNewUser } from "../../features/users/userAxios";

const SignUp = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = form;

    // rest - > {fname, email}
    if (confirmPassword !== rest.password) {
      return alert("password do not match");
    }

    const responsePendig = postNewUser(rest);
    toast.promise(responsePendig, {
      pending: "Please wait....",
    });

    const { status, message } = await responsePendig;

    toast[status](message);

    if (status == "success") {
      navigate("/");
    }
  };

  const inputs = [
    {
      label: "First Name",
      name: "fName",
      type: "text",
      required: true,
      placeholder: "Sam",
    },
    {
      label: "Last Name",
      name: "lName",
      type: "text",
      required: true,
      placeholder: "Rogan",
    },
    {
      label: "Phone",
      name: "phone",
      type: "number",
      required: false,
      placeholder: "041345678",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      placeholder: "Sam@email.com",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      placeholder: "*******",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      required: true,
      placeholder: "*******",
    },
  ];

  return (
    <Row>
      <Col>
        <Form
          onSubmit={handleOnSubmit}
          className="shadow-lg border p-5 rounded  m-auto mt-4"
          style={{ width: "450px" }}
        >
          <h1>Join the library community!</h1>
          <hr />
          {inputs.map((input, i) => (
            <CustomInput key={i} {...input} onChange={handleOnChange} />
          ))}
          {error && (
            <div className="my-3">
              <ul>
                <li className="text-danger fw-bolder">{error}</li>
              </ul>
            </div>
          )}
          <div className="d-grid">
            <Button disabled={error} type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default SignUp;
