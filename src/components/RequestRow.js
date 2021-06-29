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

async function fetchRequestTitle(listingId){
    let req = await API.get("phlox", `/listing/${listingId}`)
    return req.title;
}

async function fetchRequesterName(userId){

}

export default function RequestRow({request}) {
    async function approve(){
        try{
            await updateListing(1);
            alert("successfully updated status")
        }catch(e){
            onError(e)
        }
    }
    
    async function deny(){
        try{
            await updateListing(2);
            alert("successfully updated status")
        }catch(e){
            onError(e)
        }
        
    }
    
    async function cancel(){
        try{
            await updateListing(3);
            alert("successfully updated status")
        }catch(e){
            onError(e)
        }
    }
    
    function updateListing(requestStatus, archived = true){
        return API.put('phlox', `/request/${request.requestId}`, {
            body: {requestStatus, userId: request.userId, archived}
        })
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
    <td> { STATUS[request.requestStatus] }</td>
    <td> { request.comment }</td>
    <td>
        <Button onClick={approve} variant="outline-primary" size="sm" disabled = { STATUS[request.requestStatus] != 'PENDING' }>Approve</Button> 
        <Button onClick={deny} variant="outline-primary" size="sm" disabled = { STATUS[request.requestStatus] != 'PENDING' }>Deny</Button>
        <Button onClick={cancel} variant="outline-primary" size="sm" disabled = { STATUS[request.requestStatus] == 'PENDING' || STATUS[request.requestStatus] == 'CANCELED' }>Cancel</Button>
        <Button href={"/listing/"+ request.listingId} variant="outline-primary" size="sm">View Listing</Button>
    </td>
    </tr>
   )
 };