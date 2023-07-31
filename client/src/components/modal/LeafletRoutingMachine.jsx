/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = ({ uLat, uLng, pLat, pLng }) => {
  const map = useMap();
  const markerRef = useRef(null);
  const routingControlRef = useRef(null);
  let DefaultIcon = L.icon({
    iconUrl: "/marche.gif",
    iconSize: [90, 90],
  });

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng([uLat, uLng]);
    } else {
      markerRef.current = L.marker([uLat, uLng], { icon: DefaultIcon }).addTo(map);
    }
  }, [uLat, uLng, map]);

  useEffect(() => {
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    routingControlRef.current = L.Routing.control({
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
      geocoder: L.Control.Geocoder.nominatim(),
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);

    routingControlRef.current.on("routesfound", function (e) {
      e.routes[0].coordinates.forEach((c, i) => {
        setTimeout(() => {
          markerRef.current.setLatLng([c.lat, c.lng]);
        }, 1000 * i);
      });
    });

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [uLat, uLng, pLat, pLng, map]);

  return null;
};

export default LeafletRoutingMachine;
