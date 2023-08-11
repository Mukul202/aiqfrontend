import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Icon, divIcon, point } from "leaflet";
import { useEffect, useState } from "react";

// create custom icon
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: require("./icons/placeholder.png"),
  iconSize: [38, 38] // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};
const results= [
  {
      "id": 382,
      "plant_name": "Palo Verde",
      "plant_state": "AZ",
      "annual_net_generation": 31629862,
      "longitude": -112.8617,
      "latitude": 33.3881,
      "percentage": 29.15
  },
  {
      "id": 162,
      "plant_name": "Browns Ferry",
      "plant_state": "AL",
      "annual_net_generation": 31053552,
      "longitude": -87.1189,
      "latitude": 34.7042,
      "percentage": 21.76
  },
  {
      "id": 9338,
      "plant_name": "Peach Bottom",
      "plant_state": "PA",
      "annual_net_generation": 22268244,
      "longitude": -76.268742,
      "latitude": 39.758936,
      "percentage": 9.23
  },
  {
      "id": 9671,
      "plant_name": "Oconee",
      "plant_state": "SC",
      "annual_net_generation": 22206463,
      "longitude": -82.8986,
      "latitude": 34.7939,
      "percentage": 22.63
  },
  {
      "id": 10349,
      "plant_name": "South Texas Project",
      "plant_state": "TX",
      "annual_net_generation": 20855004,
      "longitude": -96.0481,
      "latitude": 28.795,
      "percentage": 4.34
  },
  {
      "id": 188,
      "plant_name": "James H Miller Jr",
      "plant_state": "AL",
      "annual_net_generation": 20528965,
      "longitude": -87.0597,
      "latitude": 33.6319,
      "percentage": 14.38
  },
  {
      "id": 2698,
      "plant_name": "West County Energy Center",
      "plant_state": "FL",
      "annual_net_generation": 20327004,
      "longitude": -80.3747,
      "latitude": 26.6986,
      "percentage": 8.26
  },
  {
      "id": 3440,
      "plant_name": "Byron Generating Station",
      "plant_state": "IL",
      "annual_net_generation": 19969652,
      "longitude": -89.2819,
      "latitude": 42.0742,
      "percentage": 11.01
  },
  {
      "id": 9389,
      "plant_name": "TalenEnergy Susquehanna",
      "plant_state": "PA",
      "annual_net_generation": 19943546,
      "longitude": -76.1462,
      "latitude": 41.0919,
      "percentage": 8.27
  },
  {
      "id": 2907,
      "plant_name": "Vogtle",
      "plant_state": "GA",
      "annual_net_generation": 19786908,
      "longitude": -81.7625,
      "latitude": 33.1427,
      "percentage": 15.93
  }
]
// markers
const markers = [
  {
    geocode: [48.86, 2.3522],
    popUp: "Hello, I am pop up 1"
  },
  {
    geocode: [33.3881, -112.8617],
    popUp: "Hello, I am pop up 2"
  },
  {
    geocode: [48.855, 2.34],
    popUp: "Hello, I am pop up 3"
  }
];

export default function App() {

  const [stateSelected,setState]=useState('');

  useEffect(() => {
    const getPowerplants=async () => {
      if(stateSelected!==''){
        await fetch()
      }
    };  
    getPowerplants();
  },[]);

  return (
    <MapContainer center={[33.3881, -112.8617]} zoom={4}>
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* WATERCOLOR CUSTOM TILES */}
      {/* <TileLayer
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
      /> */}
      {/* GOOGLE MAPS TILES */}
      {/* <TileLayer
        attribution="Google Maps"
        // url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
        url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
        maxZoom={20}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      /> */}

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {/* Mapping through the markers */}
        {results.map((marker) => (
          <Marker position={[marker.latitude,marker.longitude]} icon={customIcon}>
            <Popup>
              <h2>PLant Name: {marker.plant_name}</h2>
              <h2>Plant's Annual Net Generation: {marker.annual_net_generation}</h2>
              <h2>Plant's percentage to its federal state: {marker.percentage}</h2>
            </Popup>
          </Marker>
        ))}

        {/* Hard coded markers */}
        {/* <Marker position={[51.505, -0.09]} icon={customIcon}>
          <Popup>This is popup 1</Popup>
        </Marker>
        <Marker position={[51.504, -0.1]} icon={customIcon}>
          <Popup>This is popup 2</Popup>
        </Marker>
        <Marker position={[51.5, -0.09]} icon={customIcon}>
          <Popup>This is popup 3</Popup>
        </Marker>
       */}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
