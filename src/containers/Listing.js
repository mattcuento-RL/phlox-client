import React, { useState, useEffect } from 'react';
import { onError } from '../libs/errorLib';
import { API, Auth } from 'aws-amplify';
import { useParams, useHistory } from "react-router-dom";
import {Container,Image, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Storage } from 'aws-amplify';
import Sidebar from "../components/SideBar.js";
import { isReservationValid } from '../libs/resValidityLib';
import '../components/SideBar.css';
import { start } from '@popperjs/core';
import LoaderButton from '../components/LoaderButton';


export default function Listing() {
    const history = useHistory();
    const [listing, setListing] = useState(null);
    const [title, setTitle] = useState("N/a");
    const [description, setDescription] = useState("N/a");
    const [policy, setPolicy] = useState("N/a");
    const [imageUrl, setImageUrl] = useState(null);
    const [listingId, setListingId] = useState(null);
    const [userId, setUserId] = useState("N/a");
    const [category, setCategory] = useState("N/a");
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const [startDate, setstartDate] = useState(tomorrow.toISOString().substring(0, 10));
    const [comment, setComment] = useState('');
    tomorrow.setDate(tomorrow.getDate() + 1)
    const [endDate, setendDate] = useState(tomorrow.toISOString().substring(0, 10))
    const { id } = useParams();
    const [author, setAuthor] = useState("N/a");
    const [authorId, setAuthorId] = useState(false);
    const [address, setAddress] = useState("N/a");
    const [phoneNumber, setPhoneNumber] = useState("N/a");
    const [currentReservations, setCurrentReservations] = useState([]);
    const [valid, setValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    function validateRentRequest() {
        const newValid = isReservationValid(startDate, endDate, currentReservations);

        if (newValid !== valid) {
            setValid(newValid);
        }

        return newValid;
    }

    async function removeListing() {
        const answer = confirm("Are you sure you want to remove this listing?");

        if (answer) {
            setIsLoading(true);
            try {
                await API.del('phlox', `/listing/${listingId}`);
                setIsLoading(false);
                history.push('/');
            } catch (e) {
                onError(e);
            }
            
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {      
          const { attributes } = (await Auth.currentUserInfo());
          await createRequest({ listingId, listingAuthorId: userId, rate: 0, archived: false, startDate, endDate, comment, phoneNumber: attributes.phone_number, 
            firstName: attributes.name, lastName: attributes.family_name});
          setIsLoading(false);
          history.push('/renterrequests');
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

        function loadReservations(id) {
            return API.get('phlox', `/approved-reservations/${id}`);
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
            const { title, description, policy, imageUrl, listingId, userId, category, firstName, lastName, address, phoneNumber } = listing;    
            
            setListing(listing);
            setTitle(title);
            setDescription(description);
            setPolicy(policy);
            setListingId(listingId);
            setUserId(userId);
            setCategory(category);

            setImageUrl(await loadImage(imageUrl));
            setAuthor(`${firstName} ${lastName}`);
            setAddress(address);
            setPhoneNumber(phoneNumber);
            setAuthorId(userId === await loadCognitoId());
            const reservations = await loadReservations(listingId);
            setCurrentReservations(reservations);
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
                <Row>
                    <Col>
                        <p><b>Description: </b>{ description }</p>
                        <p><b>Category: </b>{ category }</p>
                        <p><b>Policies: </b>{ policy }</p>
                    </Col>
                    <Col>
                        <p><b>Author: </b>{ author }</p>
                        <p><b>Phone Number: </b>{ phoneNumber }</p>
                        <p><b>Address: </b>{ address }</p>
                    </Col>
                </Row>
                <div style={{textAlign:'center'}}>
                <Image src={imageUrl} fluid/>
                </div>
                { authorId ? <LoaderButton block size="lg" variant="danger" isLoading={isLoading} type="button" onClick={removeListing}>Remove Listing</LoaderButton> : 
                    <Form onSubmit={handleSubmit}>
                    { !valid ? <Alert variant="warning">The requested date range collides with existing reservations.</Alert> : <></> }
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
                    <LoaderButton block size="lg" type="submit" isLoading={isLoading} disabled={!validateRentRequest()}>
                        Rent
                    </LoaderButton>
                  </Form>}
                </Col>
                  </Row>
            </Container>
        )
    );
}

