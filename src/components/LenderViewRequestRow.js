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

export default function LenderViewRequestRow({request}) {
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
        return API.put('phlox', `/request/${request[0].requestId}`, {
            body: {requestStatus, userId: request[0].userId, archived}
        })
    }

    // console.log(fetchRequestTitle(request.listingId))
    // console.log(fetchRequesterName(request.userId))
  return (
    <tr>
    <td> { request[1] }</td>
    <td> { request[0].userId } </td>
    <td>{ request[0].startDate }</td>
    <td> { request[0].endDate }</td>
    <td>{ request[0].rate } </td>
    <td> { STATUS[request[0].requestStatus] }</td>
    <td> { request[0].comment }</td>
    <td>
        <Button onClick={approve} variant="outline-primary" size="sm" disabled = { STATUS[request[0].requestStatus] != 'PENDING' }>Approve</Button> 
        <Button onClick={deny} variant="outline-primary" size="sm" disabled = { STATUS[request[0].requestStatus] != 'PENDING' }>Deny</Button>
        <Button onClick={cancel} variant="outline-primary" size="sm" disabled = { STATUS[request[0].requestStatus] == 'PENDING' || STATUS[request[0].requestStatus] == 'CANCELED' }>Cancel</Button>
        <Button href={"/listing/"+ request[0].listingId} variant="outline-primary" size="sm">View Listing</Button>
    </td>
    </tr>
   )
 };