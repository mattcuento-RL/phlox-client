import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./CreateListing.css";

export default function CreateListing() {
        
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [images, setImages] = useState([]);

  function validateForm() {
    // return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="CreateListing">
      <div className="lander">
        <h1>Create Listing</h1>
        <p className="text-muted">Enter Listing Info</p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            autoFocus
            type="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="rules">
          <Form.Label>Rules</Form.Label>
          <Form.Control
            type="rules"
            value={rules}
            onChange={(e) => setRules(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control
            multiple type="file"
            value={images}
            onChange={(e) => setImages(e.target.files)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Publish Listing
        </Button>
      </Form>
    </div>
  );
}