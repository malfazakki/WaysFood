/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationMarker({ onLocate, clickedPosition }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    // Send the position back to the parent component
    if (position && onLocate) {
      onLocate(position);
    }
  }, [position, onLocate]);

  const handleMarkerDragEnd = (e) => {
    setPosition(e.target.getLatLng());
  };

  return position === null ? null : (
    <Marker position={position} draggable={true} eventHandlers={{ dragend: handleMarkerDragEnd }}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const MapLiveLocation = ({ clickedPosition, setClickedPosition }) => {
  const mapRef = useRef(null);

  const handleLocateClick = () => {
    // Use the map reference to trigger the locate method
    if (mapRef.current) {
      mapRef.current.locate();
    }
  };

  const handleLocate = (position) => {
    // Do something with the position if needed
    if (setClickedPosition) {
      setClickedPosition(position);
    }
  };

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
          <LocationMarker onLocate={handleLocate} clickedPosition={clickedPosition} />
        </MapContainer>
        <button onClick={handleLocateClick} className="py-2 bg-[#433434] px-3 text-white font-semibold rounded-md mt-5">
          Locate Me
        </button>
      </div>
    </div>
  );
};

export default MapLiveLocation;
