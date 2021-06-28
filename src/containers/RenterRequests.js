import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { API } from "aws-amplify";
import "./RenterRequests.css";
import RequestRow from "../components/RequestRow";
// const rows = []

export default function RenterRequests() {
  const [requests, setRequests] = useState([]);
  
  useEffect(() => {
    async function getRequests() {
      return API.get('phlox', '/lender-requests');
    }


    async function onLoad() {
      try {
        const requestList = await getRequests();
        setRequests(requestList);
        console.log(requests);
      } catch (e) {
        // console.alert(e);
      }
    }

    onLoad();
  }, []);

  return (
    <div className="RenterRequests">
      <div className="lander">
        <h1>Rent Requests</h1>

        <Table responsive>
            <thead>
                <tr>
                <th>Title</th>
                <th>Renter</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Rate</th>
                <th>Status</th>
                <th>Comments</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {/* {requests.forEach(request => {
                  rows.push(<RequestRow request={request}/>)
                })};
                {
                  rows
                } */}

                {requests.map(request => (
                  <RequestRow request={request}/>
                ))}

            </tbody>
        </Table>

      </div>
    </div>
  );
}