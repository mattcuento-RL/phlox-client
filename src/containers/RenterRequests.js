import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { API } from "aws-amplify";
import "./RenterRequests.css";
import RenterViewRequestRow from "../components/RenterViewRequestRow";
//Renter Requests

export default function RenterRequests() {
  const [requests, setRequests] = useState([]);
  
  useEffect(() => {
    async function getRequests() {
      return API.get('phlox', '/renter-requests');
    }


    async function fetchTitle(listingId){
      let req = await API.get("phlox", `/listing/${listingId}`)
      return req.title;
    }

    async function fetchRequestTitle(reqs){
      let listing_info= [];
  
      var res = await Promise.all(reqs.map((req)=> {
          return fetchTitle(req.listingId);
      }))
  
      reqs.map((req,i)=>{   
          listing_info.push([req,res[i]]);
      });  
      // console.log(listing_info);
      return listing_info;
    }

    async function onLoad() {
      try {
        // const requestList = await getRequests();
        // // requests = requestList;
        // console.log(requestList);
        // setRequests(requestList);

        const requestList = await getRequests();
        console.log(requestList);
        const info = await fetchRequestTitle(requestList);
        setRequests(info);
      } catch (e) {
        // console.alert(e);
      }
    }

    onLoad();
  }, []);

  return (
    <div className="RenterRequests">
      <div className="lander">
        <h1>Renter Requests</h1>

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
                {/* {requests.forEach(request => {
                  rows.push(<RequestRow request={request}/>)
                })};
                {
                  rows
                } */}

                {requests.map(request => (
                  <RenterViewRequestRow request={request}/>
                ))}

            </tbody>
        </Table>

      </div>
    </div>
  );
}