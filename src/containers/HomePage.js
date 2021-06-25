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


const Dash = props => {
   
    const [notes, setNotes] = useState([]);
    const { isAuthenticated } = useAppContext(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
    //   try {
    //     const notes = await loadNotes();
    //     setNotes(notes);
    //   } catch (e) {
    //     onError(e);
    //   }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, []);
  function loadNotes() {
    // return API.get("notes", "/notes");
  }

  function renderNotesList(notes) {
    // return (
    //   <>
    //     <LinkContainer to="/notes/new">
    //       <ListGroup.Item action className="py-3 text-nowrap text-truncate">
    //         <BsPencilSquare size={17} />
    //         <span className="ml-2 font-weight-bold">Create a new note</span>
    //       </ListGroup.Item>
    //     </LinkContainer>
    //     {notes.map(({ noteId, content, createdAt }) => (
    //       <LinkContainer key={noteId} to={`/notes/${noteId}`}>
    //         <ListGroup.Item action>
    //           <span className="font-weight-bold">
    //             {content.trim().split("\n")[0]}
    //           </span>
    //           <br />
    //           <span className="text-muted">
    //             Created: {new Date(createdAt).toLocaleString()}
    //           </span>
    //         </ListGroup.Item>
    //       </LinkContainer>
    //     ))}
    //   </>
    // );
  }

function renderLander() {
    return (
      <div className="lander">
        <h1>Phlox</h1>
        <p className="text-muted">Enjoy Te Outdoors</p>
      </div>
    );
  }

  function renderNotes() {
    return (
      <>
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
                    </Row>
                    </Col>
                </Row>

            </Container>
        </>
    );
  }

    return (
        <div className="Home">
            {isAuthenticated ? renderNotes() : renderLander()}
        </div> 
        );
  };
  const Dashboard = withRouter(Dash);
  export default Dashboard

