import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { verifyUser } from "../../features/user/userAxios";

export const VerifyUser = () => {
  const { _token } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerificaiton = async () => {
    setIsLoading(true);
    const { status, message } = await verifyUser(_token);
    setIsLoading(false);

    if (status == "success") {
      setSuccess(message);
    } else {
      setError(message);
    }
  };

  return (
    <div>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center mb-4">Verify Your Account</h2>
            {error && (
              <Alert key="danger" variant="danger">
                {error}
              </Alert>
            )}

            {success && (
              <Alert key="success" variant="success">
                {success}
              </Alert>
            )}

            <Button
              variant="primary"
              className="w-100"
              disabled={isLoading}
              onClick={!isLoading ? handleVerificaiton : null}
            >
              {isLoading
                ? "Loading…"
                : success
                ? "Verified"
                : "Click to Verify"}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VerifyUser;
