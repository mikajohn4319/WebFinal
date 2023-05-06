import { useEffect, useState } from "react";
import React from 'react'

interface Building {
  _id: string;
  id: number;
  name: string;
  lat: number;
  long: number;
  code: string;
  description: string;
}

function BuildingTable() {
  const [data, setData] = useState<Building[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/buildings", {
      method: "GET",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "buildings")
      setData(data);
    });
  }, []);

  const handleDelete = (id: string) => {
    fetch(`http://localhost:3000/buildings/${id}`, {
      method: "DELETE",
    })
    .then(() => {
      const updatedData = data.filter(building => building._id !== id);
      setData(updatedData);
    })
    .catch((error) => console.error(error));
  }

  return (
    <div style={{display: 'flex', justifyContent:'center',}}>
      {/* <h1>Building List</h1> */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Code</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((buildings) => {
            return (
            <tr key={buildings._id}>
              <td>{buildings.id}</td>
              <td>{buildings.name}</td>
              <td>{buildings.lat}</td>
              <td>{buildings.long}</td>
              <td>{buildings.code}</td>
              <td>{buildings.description}</td> 
              <td><button onClick={() => handleDelete(buildings._id)}>Delete</button></td>
            </tr>
            );
            })}
        </tbody>
      </table>
    </div>
  )
}

export default BuildingTable;
