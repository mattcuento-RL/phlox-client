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

export default function LenderViewRequestRow({request}) {

    async function approve(){
        try{
            await updateListing(1);
        }catch(e){
            onError(e)
        }
    }
    
    async function deny(){
        try{
            await updateListing(2);
        }catch(e){
            onError(e)
        }
        
    }
    
    async function cancel(){
        try{
            await updateListing(3);
        }catch(e){
            onError(e)
        }
    }
    
    async function updateListing(requestStatus, archived = true){
        await API.put('phlox', `/request/${request[0].requestId}`, {
            body: {requestStatus, userId: request[0].userId, archived}
        });

        window.location.reload();
    }

    // console.log(fetchRequestTitle(request.listingId))
  return (
    <tr>
    <td> { request[1] }</td>
    <td> { request[0].firstName && request[0].lastName ? `${request[0].firstName} ${request[0].lastName}` : "N/a" } </td>
    <td> { request[0].phoneNumber} </td>
    <td>{ request[0].startDate }</td>
    <td> { request[0].endDate }</td>
    <td> { STATUS[request[0].requestStatus] }</td>
    <td> { request[0].comment }</td>
    <td>
        <Button className="p-1" onClick={approve} variant="outline-primary" size="sm" disabled = { STATUS[request[0].requestStatus] != 'PENDING' }>Approve</Button> 
        <Button className="p-1" onClick={deny} variant="outline-primary" size="sm" disabled = { STATUS[request[0].requestStatus] != 'PENDING' }>Deny</Button>
        <Button className="p-1" onClick={cancel} variant="outline-primary" size="sm" disabled = { STATUS[request[0].requestStatus] == 'PENDING' || STATUS[request[0].requestStatus] == 'CANCELED' }>Cancel</Button>
        {
            STATUS[request[0].requestStatus] == 'CANCELED' ? <></> :
            <Button className="p-1" href={"/listing/"+ request[0].listingId} variant="outline-primary" size="sm">View</Button>

        }
    </td>
    </tr>
   )
 };