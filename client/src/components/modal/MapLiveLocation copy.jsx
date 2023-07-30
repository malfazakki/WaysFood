/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapRouting = () => {
  const mapRef = useRef(null);

  return (
    <div className="relative mx-auto bg-white rounded-md shadow-lg">
      <div className="container m-auto flex flex-col justify-center items-center py-10 px-5 shadow-lg">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={16}
          style={{ width: "80vw", height: "calc(40vh)", margin: "0 auto" }}
          ref={mapRef} // Assign the map reference
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* Pass the handleLocate function to LocationMarker */}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapRouting;
