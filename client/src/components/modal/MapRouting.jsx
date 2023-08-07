/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LeafletRoutingMachine from "./LeafletRoutingMachine";
// import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet-control-geocoder"; // Import the geocoder plugin
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import L from "leaflet";

const MapRouting = ({ uLat, uLng, pLat, pLng }) => {
  const mapRef = useRef(null);

  return (
    <div className="relative mx-auto bg-white rounded-md shadow-lg">
      <div className="m-auto flex flex-col justify-center items-center py-10 px-5 shadow-lg min-w-0">
        <MapContainer
          center={[-6.42806409558657, 106.75406445110613]}
          zoom={10}
          style={{ width: "80vw", height: "60vh", margin: "0 auto" }}
          ref={mapRef} // Assign the map reference
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LeafletRoutingMachine uLat={uLat} uLng={uLng} pLat={pLat} pLng={pLng} />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapRouting;
