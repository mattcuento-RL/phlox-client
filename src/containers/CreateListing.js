import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import { onError } from "../libs/errorLib";
import "./CreateListing.css";

export default function CreateListing() {
        
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [policy, setPolicy] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const file = useRef(null);
//   const [images, setImages] = useState([]);

  function validateForm() {
    // return title.length > 0 && category.length > 0 && description.length > 0 && policy.length > 0 && images.length > 0;
    return title.length > 0 && category.length > 0 && description.length > 0 && policy.length > 0 && file;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }
  
    setIsLoading(true);
  
    try {
      const imageUrls = file.current ? await s3Upload(file.current) : null;
  
      await createListing({ title, category, description, policy, imageUrls });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createListing(listing) {
      console.log(listing)
    return API.post("phlox", "/listing", {
      body: listing
    });
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
        <Form.Group size="lg" controlId="policy">
          <Form.Label>Policy</Form.Label>
          <Form.Control
            type="policy"
            value={policy}
            onChange={(e) => setPolicy(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control
            // multiple type="file"
            // value={images}
            onChange={handleFileChange} type = "file"
            // onChange={(e) => setImages(e.target.files)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Publish Listing
        </Button>
      </Form>
    </div>
  );
}