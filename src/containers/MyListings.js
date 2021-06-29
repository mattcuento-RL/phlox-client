import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import {Container, Row, Col, Card, Button, CardColumns} from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../components/SideBar.js";
import '../components/SideBar.css';
import '../containers/HomePage.css';

import {Storage} from "aws-amplify";

const LenderList = props => {
   
    const [cards, setCards] = useState([]);
    const [listings, setListings] = useState([]);
    const { isAuthenticated } = useAppContext(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
      try {
        const listings = await fetchMyListings();
        const cards = await loadCards(listings);
        setListings(listings)
        setCards(cards);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [isAuthenticated]);

  function fetchMyListings() {
    return API.get("phlox", "/lender-listings");
  }

  function loadImage(url){
    return Storage.get(url);
  }

  async function loadCards(listings){
    let listing_info= [];
  
    var res = await Promise.all(listings.map((listing)=> {
        return loadImage(listing.imageUrl);
    }))

    listings.map((listing,i)=>{   
        listing_info.push([listing.title,listing.listingId,res[i]]);
    });  

    return listing_info;
  }


function renderLander() {
    return (
      <div className="lander">
        <h1>Phlox</h1>
        <p className="text-muted">Enjoy The Outdoors</p>
      </div>
    );
  }

  function renderDashboard() {

    const items = cards.map(function(card){
        return( 
            <Card className="p-2">
            <Card.Body>
                <Card.Title style={{textAlign:'center'}}>{card[0]}</Card.Title>
                <Card.Img variant="top" src={card[2]} className="p-2 card-image-top"/>
                <div class="text-center p-2">
                <Button href={"/listing/"+ card[1]} variant="primary">View Details</Button>
                </div>
            </Card.Body>
            </Card>
        )
      });

    return (
        <Container fluid>
            <Row>
                <Col lg={2} id="sidebar-wrapper" style={{marginTop: '.5rem' }}>      
                <Sidebar />
                </Col>
                <Col>
                  <div className="lander">
                      <h1>My Listings</h1>
                  </div>
                    <CardColumns>
                      {items}                     
                    </CardColumns>
                </Col>
            </Row>
        </Container>

    );
  }

    return (
        <div className="Home">
            {isAuthenticated ? renderDashboard() : renderLander()}
        </div> 
        );
  };
  const LenderListings = withRouter(LenderList);
  export default LenderListings