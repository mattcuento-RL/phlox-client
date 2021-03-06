import React, { useEffect, useState } from "react";
import {Container, Row, Col, Card, Table} from "react-bootstrap";
import { API } from "aws-amplify";
import "./LenderRequests.css";
import LenderViewRequestRow from "../components/LenderViewRequestRow";
import Sidebar from "../components/SideBar.js";
import '../components/SideBar.css';

export default function LenderRequests() {
  const [requests, setRequests] = useState([]);
  
  useEffect(() => {
    async function getRequests() {
      return API.get('phlox', '/lender-requests');
    }

    async function fetchTitle(listingId){
      let req = await API.get("phlox", `/listing/${listingId}`)
      return req.title;
    }

    async function fetchRequestTitle(reqs){
      let listing_info= [];
  
      var res = await Promise.all(reqs.map((req)=> {
          return fetchTitle(req.listingId);
      }))
  
      reqs.map((req,i)=>{   
          listing_info.push([req,res[i]]);
      });  
      // console.log(listing_info);
      return listing_info;
    }


    async function onLoad() {
      try {
        const requestList = await getRequests();
        const info = await fetchRequestTitle(requestList);
        console.log(info);
        setRequests(info);
      } catch (e) {
        // console.alert(e);
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
                <div className="LenderRequests">
                  <div className="lander">
                    <h1>Lender Requests</h1>

                    <Table responsive>
                        <thead>
                            <tr>
                            <th>Title</th>
                            <th>Renter</th>
                            <th>Phone</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Comments</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {requests.map(request => {
                              return <LenderViewRequestRow request={request}/>
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