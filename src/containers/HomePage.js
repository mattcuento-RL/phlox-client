import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import {Container, Row, Col, Card, Button, Form, CardColumns} from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../components/SideBar.js";
import '../components/SideBar.css';
import './HomePage.css'
import {Storage} from "aws-amplify";

const Dash = props => {
   
    const [cards, setCards] = useState([]);
    const [listings, setListings] = useState([]);
    const { isAuthenticated } = useAppContext(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredCards, setFilteredCards] = useState([]);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");


    useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
      try {
        const listings = await fetchListings();
        const cards = await loadCards(listings);
        setListings(listings)
        setCards(cards);
        setFilteredCards(cards);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [isAuthenticated]);

  function fetchListings() {
    return API.get("phlox", "/listings");
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
        listing_info.push([listing.title,listing.listingId,res[i], listing.category]);
    });  

    return listing_info;
  }

  const handleSearch = () => {
    event.preventDefault();
    
    let result = [];

    result = cards.filter((card) => {
      if (filter === 'All') {
        return card[0].toLowerCase().search(search) != -1;
      } else {
        if (filter === card[3]) {
          return card[0].toLowerCase().search(search) != -1;
        } else {
          return false;
        }
      }
    });
    setFilteredCards(result);
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

    const items = filteredCards.map(function(card){
        return( 
            <Card className="p-2">
            <Card.Body>
                <Card.Title style={{textAlign:'center'}}>{card[0]}</Card.Title>
                <Card.Img className="card-image-top p-2" variant="top" src={card[2]} />
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
                <Col md={2} id="sidebar-wrapper" style={{marginTop: '.5rem' }}>      
                <Sidebar />
                </Col>
                <Col md={10}>
                      <Form className="w-100 px-3 row" onSubmit={handleSearch}>
                      <div className="col-md-3">
                      <Form.Group size="lg" controlId="search">
                          <Form.Control
                              as="select"
                              placeholder="Filter By..."
                              onChange={(event) => setFilter(event.target.value)}
                          >
                            <option>All</option>
                            <option>Skiing</option>
                            <option>Snowboarding</option>
                            <option>Golf</option>
                            <option>Climbing</option>
                            <option>Cycling</option>
                            <option>Mountain Biking</option>
                            <option>Water Sports</option>
                            <option>Racket Sports</option>
                          </Form.Control>
                      </Form.Group>
                      </div>
                      <div className="col-md-7">
                      <Form.Group size="lg" controlId="search">
                          <Form.Control
                              type="text"
                              placeholder="Search"
                              onChange={(event) => setSearch(event.target.value)}
                          />
                      </Form.Group>
                      </div>
                      <div className="col-md-2">
                        <Button type="submit">Search</Button>
                      </div>
                      </Form>
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
  const Dashboard = withRouter(Dash);
  export default Dashboard