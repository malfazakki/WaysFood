/* eslint-disable react/prop-types */
import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-geocoder-locationiq/dist/leaflet-geocoder-locationiq.min.css"; // Import LocationIQ geocoder CSS
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = ({ uLat, uLng, pLat, pLng }) => {
  const map = useMap();
  let DefaultIcon = L.icon({
    iconUrl: "/marche.gif",
    iconSize: [90, 90],
  });

  useEffect(() => {
    // Set up LocationIQ geocoder options
    const geocoder = L.Control.Geocoder.locationiq({
      geocoderUrl: "https://eu1.locationiq.com/v1/search.php", // Replace with LocationIQ API URL
      apiKey: "pk.ec3ec8e73ea41ccefedfd001e1e1ddab", // Replace with your LocationIQ API key
      position: "topleft", // Change the position of the geocoder control if needed
    });

    // Add the geocoder control to the map
    map.addControl(geocoder);

    // Create the routing control with LocationIQ geocoder
    L.Routing.control({
      waypoints: [L.latLng(pLat, pLng), L.latLng(uLat, uLng)],
      lineOptions: {
        styles: [
          {
            color: "blue",
            weight: 4,
            opacity: 0.7,
          },
        ],
      },
      routeWhileDragging: false,
      geocoder: geocoder, // Use the LocationIQ geocoder
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    })
      .on("routesfound", function (e) {
        // The marker for the user's location (start point) was removed, so no need to update it here
        e.routes[0].coordinates.forEach((c, i) => {
          setTimeout(() => {
            // The marker for the user's location (start point) was removed, so no need to update it here
          }, 1000 * i);
        });
      })
      .addTo(map);
  }, [uLat, uLng, pLat, pLng, map]);

  return null;
};

export default LeafletRoutingMachine;
