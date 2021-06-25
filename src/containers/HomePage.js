import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import {Container, Row, Col, Card, Form, Button,CardColumns } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../components/SideBar.js";
import '../components/SideBar.css'

// render() {
const data =[{"name":"test1"},{"name":"test2"}];
const listItems = data.map((d) => <li key={d.name}>{d.name}</li>);



const Dash = props => {
   
    return (
        <>
         {/* <Container fluid> */}
         <Container fluid>

                <Row>
                    <Col lg={2} id="sidebar-wrapper" style={{marginTop: '.5rem' }}>      
                      <Sidebar />
                    </Col>
                    
                    {/* <> */}
                    <Col>
                    <Row>
                        <Col>    
                            <Card style={{ width: '26rem', height: 'min-content', margin: '.5rem' }}>
                            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                            <Card.Body>
                                <Card.Title style={{textAlign:'center'}}>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content. This is dummy text for when we actually have stuff to populate
                                with our tables!
                                </Card.Text>
                                <div class="text-center">
                                <Button variant="primary">Go somewhere</Button>
                                </div>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col>    
                            <Card style={{ width: '26rem', height: 'min-content', margin: '.5rem' }}>
                            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                            <Card.Body>
                                <Card.Title style={{textAlign:'center'}}>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content. This is dummy text for when we actually have stuff to populate
                                with our tables!
                                </Card.Text>
                                <div class="text-center">
                                <Button variant="primary">Go somewhere</Button>
                                </div>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col>    
                            <Card style={{ width: '26rem', height: 'min-content', margin: '.5rem' }}>
                            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                            <Card.Body>
                                <Card.Title style={{textAlign:'center'}}>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content. This is dummy text for when we actually have stuff to populate
                                with our tables!
                                </Card.Text>
                                <div class="text-center">
                                <Button variant="primary">Go somewhere</Button>
                                </div>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col>    
                            <Card style={{ width: '26rem', height: 'min-content', margin: '.5rem' }}>
                            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                            <Card.Body>
                                <Card.Title style={{textAlign:'center'}}>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content. This is dummy text for when we actually have stuff to populate
                                with our tables!
                                </Card.Text>
                                <div class="text-center">
                                <Button variant="primary">Go somewhere</Button>
                                </div>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col>    
                            <Card style={{ width: '26rem', height: 'min-content', margin: '.5rem' }}>
                            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                            <Card.Body>
                                <Card.Title style={{textAlign:'center'}}>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content. This is dummy text for when we actually have stuff to populate
                                with our tables!
                                </Card.Text>
                                <div class="text-center">
                                <Button variant="primary">Go somewhere</Button>
                                </div>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col>    
                            <Card style={{ width: '26rem', height: 'min-content', margin: '.5rem' }}>
                            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                            <Card.Body>
                                <Card.Title style={{textAlign:'center'}}>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content. This is dummy text for when we actually have stuff to populate
                                with our tables!
                                </Card.Text>
                                <div class="text-center">
                                <Button variant="primary">Go somewhere</Button>
                                </div>
                            </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    </Col>
                    {/* </> */}
                </Row>

            </Container>
        </>
        );
  };
  const Dashboard = withRouter(Dash);
  export default Dashboard

