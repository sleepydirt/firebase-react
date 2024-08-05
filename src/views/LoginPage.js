import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      <h1 className="my-3">Login to your account</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="/signup">New? Sign up for an account</a>
        </Form.Group>
        <Button
          variant="primary"
          onClick={async (e) => {
            setError("");
            const canLogin = username && password;
            if (canLogin)
              try {
                await signInWithEmailAndPassword(auth, username, password);
                navigate("/");
              } catch (error) {
                setError(error.message);
              }
          }}
        >
          Login
        </Button>
      </Form>
      <p>{error}</p>
    </Container>
  );
}
