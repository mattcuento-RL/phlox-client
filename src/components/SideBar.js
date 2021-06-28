import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import './SideBar.css'

const Side = props => {
   

    return (
        <>
            <Nav 
            className="col-md-12 d-none d-md-block bg-light sidebar-wrapper"
            activeKey="/home"
            >
            <div className="sidebar-sticky"></div>
            <div className="title">Renter</div>
            <Nav.Item>
                <Nav.Link href="/homepage">Reservations</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/login">Requests</Nav.Link>
            </Nav.Item>

            <div className="title">Lender</div>
            <Nav.Item>
                <Nav.Link eventKey="/login">Listings</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled">New Requests</Nav.Link>
            </Nav.Item>
            </Nav>   
        </>
        );
  };
  const SideBar = withRouter(Side);
  export default SideBar