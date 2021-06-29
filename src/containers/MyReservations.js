import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { API } from "aws-amplify";
import "./MyRequests.css";
import RenterViewRequestRow from "../components/RenterViewRequestRow";
// const rows = []

export default function MyReservations() {
  const [requests, setRequests] = useState([]);
  
  useEffect(() => {
    async function getRequests() {
      return API.get('phlox', '/renter-requests');
    }


    async function onLoad() {
      try {
        const requestList = await getRequests();
        setRequests(requestList);
        // console.log(requestList);
      } catch (e) {
        // console.alert(e);
      }
    }

    onLoad();
  }, []);


  return (
    <div className="MyRequests">
      <div className="lander">
        <h1>My Reservations</h1>

        <Table responsive>
            <thead>
                <tr>
                <th>Title</th>
                <th>Lender</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Rate</th>
                <th>Status</th>
                <th>Comments</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>


                {requests.map(request => {
                  if(request.requestStatus === 1 ){
                    return <RenterViewRequestRow request={request}/>;
                  }
                })}

            </tbody>
        </Table>

      </div>
    </div>
  );
}