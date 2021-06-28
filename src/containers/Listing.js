import React, { useState, useEffect } from 'react';
import { onError } from '../libs/errorLib';
import { API, Auth } from 'aws-amplify';
import { useParams, useHistory } from "react-router-dom";
import {Container,Image, Row, Col, Card, Form, Button,CardColumns } from "react-bootstrap";
import { Storage } from 'aws-amplify';
import Sidebar from "../components/SideBar.js";
import '../components/SideBar.css';


export default function Listing() {
    const history = useHistory();
    const [listing, setListing] = useState(null);
    const [title, setTitle] = useState("N/a");
    const [description, setDescription] = useState("N/a");
    const [policy, setPolicy] = useState("N/a");
    const [imageUrl, setImageUrl] = useState(null);
    const [listingId, setListingId] = useState("N/a");
    const [userId, setUserId] = useState("N/a");
    const [category, setCategory] = useState("N/a");
    const [author, setAuthor] = useState(false);
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const [startDate, setstartDate] = useState(tomorrow.toISOString().substring(0, 10));
    const [comment, setComment] = useState('');
    tomorrow.setDate(tomorrow.getDate() + 1)
    const [endDate, setendDate] = useState(tomorrow.toISOString().substring(0, 10))
    const { id } = useParams();

    function availableDate() {
        return true;
    }

    function validateRentRequest() {
        const tempstartDate = new Date(startDate);
        const tempendDate = new Date(endDate);

        return (
            tempstartDate >= Date.now() &&
            tempendDate >= Date.now() &&
            tempendDate >= tempstartDate &&
            availableDate()
        );
    }


    async function removeListing() {
        const answer = confirm("Are you sure you want to remove this listing?");

        if (answer) {
            try {
                await API.del('phlox', `/listing/${listingId}`);
                history.push('/');
            } catch (e) {
                onError(e);
            }
            
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
      
        try {      
          await createRequest({ listingId, listingAuthorId: userId, rate: 0, archived: false, startDate, endDate, comment});
          alert('Request created!');
        } catch (e) {
          onError(e);
        }
    }
    
    function createRequest(request) {
        console.log(request)
        return API.post("phlox", "/request", {
            body: request
        });
    }

    useEffect(() => {
        function loadListing() {
          return API.get("phlox", `/listing/${id}`);
        }

        async function loadImage(filename) {
            return Storage.get(filename);
        }

        async function loadCognitoId() {
            return (await Auth.currentUserCredentials()).identityId;
        }
    
        async function onLoad() {
          try {
            const listing = await loadListing();
            const { title, description, policy, imageUrl, listingId, userId, category, createdAt } = listing;    
            
            setListing(listing);
            setTitle(title);
            setDescription(description);
            setPolicy(policy);
            setListingId(listingId);
            setUserId(userId);
            setCategory(category);
            setImageUrl(await loadImage(imageUrl));
            setAuthor(userId === await loadCognitoId());
          } catch (e) {
            onError(e);
          }
        }
    
        onLoad();
      }, [id]);
    

    return (
        listing && (
            <Container>
                <Row>
                <Col lg={2} id="sidebar-wrapper" style={{marginTop: '.5rem' }}>      
                   <Sidebar />
                </Col>
                <Col>
                <h1>{ title }</h1>
                <p><b>Description: </b>{ description }</p>
                <p><b>Category: </b>{ category }</p>
                <p><b>Policies: </b>{ policy }</p>
                <div style={{textAlign:'center'}}>
                <Image src={imageUrl} fluid/>
                </div>
                { author ? <Button block size="lg" type="button" onClick={removeListing}>Remove Listing</Button> : 
                    <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="startDate">
                        <Form.Label>Check In</Form.Label>
                        <Form.Control
                            type="date"
                            value={startDate}
                            onChange={(e) => setstartDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="endDate">
                        <Form.Label>Check Out</Form.Label>
                        <Form.Control
                            type="date"
                            value={endDate}
                            onChange={(e) => setendDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="comment">
                        <Form.Label>Comments?</Form.Label>
                        <Form.Control
                            type="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!validateRentRequest()}>
                        Rent
                    </Button>
                  </Form>}
                </Col>
                  </Row>
            </Container>
        )
    );
}

