import React, { useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import {Container, Row, Col, Card, Form, Button,CardColumns } from "react-bootstrap";
import { API, Auth } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import { onError } from "../libs/errorLib";
import "./CreateListing.css";
import Sidebar from "../components/SideBar.js";
import '../components/SideBar.css';
import LoaderButton from "../components/LoaderButton";

const categories = ["SKIING", "SNOWBOARDING", "GOLF", "CLIMBING", "CYCLING", "MOUNTAIN_BIKING", "RUNNING", "WAKEBOARDING", "WATER_SKIING", "RACKET_SPORTS", "OTHER"];

export default function CreateListing() {
  const history = useHistory();
        
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [policy, setPolicy] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const file = useRef(null);

  function validateForm() {
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
      const imageUrl = file.current ? await s3Upload(file.current) : null;
  
      const { attributes } = (await Auth.currentUserInfo());
      const { listingId } = await createListing({ title, category, description, policy, imageUrl, 
        address: attributes.address, phoneNumber: attributes.phone_number, 
        firstName: attributes.name, lastName: attributes.family_name });
      setIsLoading(false);
      history.push(`/listing/${listingId}`);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createListing(listing) {
    return API.post("phlox", "/listing", {
      body: listing
    });
  }

  return (
    <Container>
      <Row>
      <Col lg={2} id="sidebar-wrapper" style={{marginTop: '.5rem' }}>      
                <Sidebar />
      </Col>
      <Col>
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
          <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Skiing</option>
            <option>Snowboarding</option>
            <option>Golf</option>
            <option>Climbing</option>
            <option>Cycling</option>
            <option>Mountain Biking</option>
            <option>Running</option>
            <option>Water Sports</option>
            <option>Racket Sports</option>
            <option>Other</option>
          </Form.Control>
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
        <LoaderButton block size="lg" type="submit" isLoading={isLoading} disabled={!validateForm()}>
          Publish Listing
        </LoaderButton>
      </Form>
    </div>
    </Col>
    </Row>
    </Container>
  );
}