import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Listing from "./containers/Listing";
import CreateListing from "./containers/CreateListing";
import LenderRequests from "./containers/LenderRequests";
import RenterRequests from "./containers/RenterRequests";
import RenterReservations from "./containers/RenterReservations";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import MyListings from "./containers/MyListings";
export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/notes/new">
        <NewNote />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/listing/:id">
        <Listing />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/createlisting">
        <CreateListing />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/lenderlistings">
        <MyListings />
      </AuthenticatedRoute>
      <Route exact path="/homepage">
        <HomePage />
      </Route>
      <AuthenticatedRoute exact path="/lenderrequests">
        <LenderRequests />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/renterrequests">
        <RenterRequests />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/renterreservations">
        <RenterReservations />
      </AuthenticatedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}