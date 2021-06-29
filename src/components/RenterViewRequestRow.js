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



export default function RenterViewRequestRow({request}) {

  return (
    <tr>
    <td> { request[1]}</td>
    <td> { request[0].listingAuthorId } </td>
    <td>{ request[0].startDate }</td>
    <td> { request[0].endDate }</td>
    <td>{ request[0].rate } </td>
    <td> { STATUS[request[0].requestStatus] }</td>
    <td> { request[0].comment }</td>
    <td>
        <Button href={"/listing/"+ request[0].listingId} variant="outline-primary" size="sm">View Listing</Button>
    </td>
    </tr>
   )
 };