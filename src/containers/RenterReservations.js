import React, { useEffect, useState } from "react";
import {Container, Row, Col, Card, Table, Form, Button,CardColumns } from "react-bootstrap";
import { API } from "aws-amplify";
import "./RenterRequests.css";
import RenterViewRequestRow from "../components/RenterViewRequestRow";
import Sidebar from "../components/SideBar.js";
import '../components/SideBar.css';
// const rows = []

export default function RenterReservations() {
  const [requests, setRequests] = useState([]);
  const [titles, setTitles] = useState([]);
  
  useEffect(() => {
    async function getRequests() {
      return API.get('phlox', '/renter-requests');
    }
    
    async function fetchTitle(listingId){
      let req = await API.get("phlox", `/listing/${listingId}`)
      return [req.title, req.firstName, req.lastName, req.phoneNumber];
    }

    async function fetchRequestTitle(reqs){
      let listing_info= [];
  
      var res = await Promise.all(reqs.map((req)=> {
          return fetchTitle(req.listingId);
      }))
  
      reqs.map((req,i)=>{   
          listing_info.push([req,res[i]]);
      });  
      return listing_info;
    }


    async function onLoad() {
      try {
        const requestList = await getRequests();
        const info = await fetchRequestTitle(requestList);
        console.log(info);
        setRequests(info);
      } catch (e) {
        console.alert(e);
      }
    }

    onLoad();
  }, []);





  return (
    
    <Container fluid>
      <Row>
          <Col lg={2} id="sidebar-wrapper" style={{marginTop: '.5rem' }}>      
          <Sidebar />
          </Col>
          <Col>
          <div className="RenterRequests">
            <div className="lander">
              <h1>Renter Reservations</h1>

              <Table responsive>
                  <thead>
                      <tr>
                      <th>Title</th>
                      <th>Lender</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Rate</th>
                      <th>Status</th>
                      <th>Comments</th>
                      <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {requests.map(request => {
                        if(request[0].requestStatus === 1 ){
                          return <RenterViewRequestRow request={request}/>;
                        }
                      })}
                  </tbody>
              </Table>
            </div>
          </div>
          </Col>
      </Row>
  </Container>

  );
}