import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

var STATUS = {
0 : 'PENDING', 
1: 'APPROVED', 
2: 'DENIED',
3: 'CANCELED'
};

export default function RequestRow({request}) {

  return (
    <tr>
    <td>{ request.listingId } </td>
    <td> { request.userId } </td>
    <td>{ request.startDate }</td>
    <td> { request.endDate }</td>
    <td>{ request.rate } </td>
    <td> { STATUS[request.status] }</td>
    <td> { request.comment }</td>
    <td>
        <Button variant="outline-primary" size="sm" disabled = { STATUS[request.status] == 'DENIED' || STATUS[request.status] == 'CANCELED' }>Approve</Button> 
        <Button variant="outline-primary" size="sm" disabled = { STATUS[request.status] == 'APPROVED' || STATUS[request.status] == 'CANCELED' }>Deny</Button>
        <Button variant="outline-primary" size="sm" disabled = { STATUS[request.status] == 'PENDING' }>Cancel</Button>
        <Button variant="outline-primary" size="sm">View Listing</Button>
    </td>
    </tr>
   )
 };