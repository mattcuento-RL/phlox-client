import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { API } from "aws-amplify";

var STATUS = {
0 : 'PENDING', 
1: 'APPROVED', 
2: 'DENIED',
3: 'CANCELED'
};

async function fetchRequestTitle(listingId){
    let req = await API.get("phlox", `/listing/${listingId}`)
    return req.title;
}

async function fetchRequesterName(userId){

}

export default function RequestRow({request}) {
    function approve(){
        updateListing(0);
    }
    
    function deny(){
        updateListing(1);
    }
    
    function cancel(){
        updateListing(3);
    }
    
    function updateListing(status, archived = true){
        return API.update('phlox', `/request/${request.requestId}`);
    }
    
    function viewListing(e){
        //
    }

    console.log(fetchRequestTitle(request.listingId))
    // console.log(fetchRequesterName(request.userId))
  return (
    <tr>
    {/* <td> {fetchRequestTitle( request.listingId ) }</td> */}
    <td> { request.listingId }</td>
    <td> { request.userId } </td>
    <td>{ request.startDate }</td>
    <td> { request.endDate }</td>
    <td>{ request.rate } </td>
    <td> { STATUS[request.status] }</td>
    <td> { request.comment }</td>
    <td>
        <Button onClick={approve} variant="outline-primary" size="sm" disabled = { STATUS[request.status] == 'DENIED' || STATUS[request.status] == 'CANCELED' }>Approve</Button> 
        <Button onClick={deny} variant="outline-primary" size="sm" disabled = { STATUS[request.status] == 'APPROVED' || STATUS[request.status] == 'CANCELED' }>Deny</Button>
        <Button onClick={cancel} variant="outline-primary" size="sm" disabled = { STATUS[request.status] == 'PENDING' }>Cancel</Button>
        <Button onClick={viewListing} variant="outline-primary" size="sm">View Listing</Button>
    </td>
    </tr>
   )
 };