import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";

var STATUS = {
0: 'PENDING', 
1: 'APPROVED', 
2: 'DENIED',
3: 'CANCELED'
};

// async function fetchRequestTitle(listingId){
//     let req = await API.get("phlox", `/listing/${listingId}`)
//     console.log(req);
//     return req.title;
// }

// async function fetchRequesterName(userId){

// }

export default function RenterViewRequestRow({request}) {
  
  // async function cancel(){
  //   try{
  //       await updateListing(3);
  //       alert("successfully updated status")
  //   }catch(e){
  //       onError(e)
  //   }
  // }

  // function updateListing(requestStatus, archived = true){

  //   return API.put('phlox', `/request/${request.requestId}`, {
  //       body: {requestStatus, userId: request.userId, archived}
  //   })
  // }
    // console.log(fetchRequestTitle(request.listingId))
    // console.log(fetchRequesterName(request.userId))
  return (
    <tr>
    {/* <td> {fetchRequestTitle( request.listingId ) }</td> */}
    <td> { request.listingId }</td>
    <td> { request.listingAuthorId } </td>
    <td>{ request.startDate }</td>
    <td> { request.endDate }</td>
    <td>{ request.rate } </td>
    <td> { STATUS[request.requestStatus] }</td>
    <td> { request.comment }</td>
    <td>
        <Button href={"/listing/"+ request.listingId} variant="outline-primary" size="sm">View Listing</Button>
    </td>
    </tr>
   )
 };