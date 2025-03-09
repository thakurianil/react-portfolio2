import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { verifyUserAxios } from "../../features/user/userAxios";

export const VerifyUser = () => {

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
