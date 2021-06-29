import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import "./NotFound.css";
import Sidebar from "../components/SideBar.js";
import '../components/SideBar.css';

export default function NotFound() {
  return (
    <Container fluid>
    <Row>
        <Col lg={2} id="sidebar-wrapper" style={{marginTop: '.5rem' }}>      
        <Sidebar />
        </Col>
        <Col>
          <div className="NotFound text-center">
            <h3>Sorry, page not found!</h3>
          </div>
        </Col>
      </Row>
    </Container>
  );
}