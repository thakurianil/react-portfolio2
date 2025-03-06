import React, { useState } from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/customInpute/CustomInput";
import useForm from "../../hooks/useForm";
import { inputFields } from "../../assets/formInputs";
import { postNewBookAction } from "../../features/books/bookAction";
import { useDispatch } from "react-redux";

const initialState = {};

const AddNewBook = () => {
  const dispatch = useDispatch();
  const { form, handleOnChange } = useForm(initialState);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    //1. call post new book api
    //2. status check

    // convert form to form Data

    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    dispatch(postNewBookAction(formData));
  };

  return (
    <UserLayout pageTitle="New Book">
      <div>
        <Link to="/admin/books">
          <Button variant="secondary">&lt; Back</Button>
        </Link>
      </div>

      <div className="mt-5">
        {/* form here  */}

        <h4 className="py-4">Fill up the form to add new book</h4>

        <Form onSubmit={handleOnSubmit}>
          <Form.Group controlId="bookFile">
            <Form.Label>Upload Book Cover Image</Form.Label>
            <Form.Control
              type="file"
              name="bookFile"
              accept="image/*" // Only accept image files
              onChange={handleOnChange}
            />
          </Form.Group>

          {inputFields.map(
            (input, i) =>
              input.name != "thumbnail" && (
                <CustomInput key={i} {...input} onChange={handleOnChange} />
              )
          )}

          <div className="d-grid">
            <Button type="submit">Submit New Book</Button>
          </div>
        </Form>
      </div>
    </UserLayout>
  );
};

export default AddNewBook;
