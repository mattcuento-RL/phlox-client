import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { API } from 'aws-amplify';
import "./RenterRequests.css";
import RequestRow from "../components/RequestRow";

export default function RenterRequests() {
  const [requests, setRequests] = useState([]);
  
  useEffect(() => {
    async function getRequests() {
      return await API.get('phlox', '/lender-requests');
    }


    async function onLoad() {
      try {
        const requestList = await getRequests();
        setRequests(requestList);
        console.log(requests);
      } catch (e) {
        console.alert(e);
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
                <th>Title (listing id for now)</th>
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

                {/* const rows = []
                requests.forEach(request => {
                  rows.append(<RequestRow request={request}>)
                });

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