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
            style={{textAlign: 'center', fontSize: '17.5px'}}
            >
            <div className="sidebar-sticky"></div>
            <div className="title">Renting</div>
            <Nav.Item>
                <Nav.Link href="/renterreservations">My Reservations</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/renterrequests">My Requests</Nav.Link>
            </Nav.Item>
            
            <div className="title">Lending</div>
            <Nav.Item>
                <Nav.Link href="/createlisting">Create Listing</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/lenderlistings">My Listings</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/lenderrequests">Incoming Requests</Nav.Link>
            </Nav.Item>
            </Nav>   
        </>
        );
  };
  const SideBar = withRouter(Side);
  export default SideBar