import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Container
      style={{
        maxWidth: "600px",
        border: "1px solid #fff",
        borderRadius: "15px",
        padding: "0.5rem 2rem",
        margin: "30vh auto",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      }}
    >
      <h1 className="my-3">Sign up for an account</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <a href="/login">Have an existing account? Login here.</a>
        </Form.Group>

        <Button
          variant="primary"
          onClick={async (e) => {
            setError("");
            const canSignup = username && password;
            if (canSignup) {
              if (password === confirmPassword) {
                try {
                  await createUserWithEmailAndPassword(
                    auth,
                    username,
                    password
                  );
                  navigate("/");
                } catch (error) {
                  setError(error.message);
                }
              } else {
                setError(`Passwords do not match!`);
              }
            } else {
              setError(`Invalid email and/or password!`);
            }
          }}
        >
          Sign Up
        </Button>
      </Form>
      <p>{error}</p>
    </Container>
  );
}
