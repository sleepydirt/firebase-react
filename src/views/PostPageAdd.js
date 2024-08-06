import React, { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { signOut } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function PostPageAdd() {
  const [user, loading] = useAuthState(auth);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  async function addPost() {
    const imageReference = ref(storage, `images/${image.name}`);
    const response = await uploadBytes(imageReference, image);
    const imageUrl = await getDownloadURL(response.ref);
    await addDoc(collection(db, "posts"), {
      caption,
      image: imageUrl,
    });
    navigate("/");
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");

    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [navigate, user, loading, imagePreview]);

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">Tinkergram</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">New Post</Nav.Link>
            <Nav.Link onClick={(e) => signOut(auth)}>🚪</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container
        style={{
          maxWidth: "600px",
          border: "1px solid #fff",
          borderRadius: "15px",
          padding: "2rem",
          margin: "10rem auto",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        }}
      >
        <h1 style={{ marginBlock: "1rem" }}>Add Post</h1>
        <Form>
          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lovely day"
              value={caption}
              onChange={(text) => setCaption(text.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                style={{ width: "100%", marginTop: "10px" }}
                alt=""
              />
            )}
          </Form.Group>
          <Button variant="primary" onClick={async (e) => addPost()}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
