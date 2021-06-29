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
  console.log(request);
  return (
    <tr>
    <td> { request[1][0]}</td>
    <td> { request[1][1] + " " + request[1][2]} </td>
    <td>{ request[0].startDate }</td>
    <td> { request[0].endDate }</td>
    {/* <td>{ request[1][3]} </td> */}
    <td> { STATUS[request[0].requestStatus] }</td>
    <td> { request[0].comment }</td>
    <td>
        <Button href={"/listing/"+ request[0].listingId} variant="outline-primary" size="sm">View Listing</Button>
    </td>
    </tr>
   )
 };