import React from "react";
import L from "leaflet";

import "./Leaflet.css";

var topographic = L.tileLayer(
        "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}",
        {
            attribution: '<a href="http://www.kartverket.no/">Kartverket</a>'
        }
    ),
    basic = L.tileLayer(
        "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart&zoom={z}&x={x}&y={y}",
        {
            attribution: '<a href="http://www.kartverket.no/">Kartverket</a>'
        }
    ),
    terrain = L.tileLayer(
        "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=terreng_norgeskart&zoom={z}&x={x}&y={y}",
        {
            attribution: '<a href="http://www.kartverket.no/">Kartverket</a>'
        }
    ),
    gray = L.tileLayer(
        "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart_graatone&zoom={z}&x={x}&y={y}",
        {
            attribution: '<a href="http://www.kartverket.no/">Kartverket</a>'
        }
    ),
    realestate = L.tileLayer(
        "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=matrikkel_bakgrunn&zoom={z}&x={x}&y={y}",
        {
            attribution: '<a href="http://www.kartverket.no/">Kartverket</a>'
        }
    ),
    simple = L.tileLayer(
        "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=egk&zoom={z}&x={x}&y={y}",
        {
            attribution: '<a href="http://www.kartverket.no/">Kartverket</a>'
        }
    ),
    osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }),
    kartverket = {
        "Topografisk kart": topographic,
        Grunnkart: basic,
        Terrengkart: terrain,
        "Grått kart": gray,
        Eiendomskart: realestate,
        "Enkelt kart": simple
    },
    openstreetmaps = {
        "Open Street Map": osm
    };

class Leaflet extends React.Component {
    state = {
        current_position: undefined
    };
    componentDidMount() {
        this.map = L.map("map", {
            center: [60.91, 8.93],
            zoom: 6,
            layers: [
                topographic,
                gray,
                simple,
                realestate,
                terrain,
                basic,
                osm
            ],
            animation: true,
            duration: 1
        }).on("click", this.placePinOnMap);

        L.control.layers(kartverket, openstreetmaps).addTo(this.map);

        // this.findCurrentLocation();
    }

    findCurrentLocation = function() {
        var self = this;
        this.map
            .locate({ setView: true }, 11, { zoom: true, animation: true })
            .on("locationfound", function(e) {
                var marker = L.marker([e.latitude, e.longitude]).bindPopup(
                    "Your position"
                );
                var circle = L.circle(
                    [e.latitude, e.longitude],
                    e.accuracy / 3,
                    {
                        weight: 1,
                        color: "blue",
                        fillColor: "blue",
                        fillOpacity: 0.2
                    }
                ).bindPopup("Min posisjon");

                this.addLayer(circle);
                this.addLayer(marker);

                self.setState(state => ({
                    current_position: `${e.latitude}, ${e.longitude}`
                }));
            })
            .on("click", this.placeMarkerOnMap);
    };

    placePinOnMap = function(mapEvent) {
        console.log(mapEvent.latlng);
        // this.map.on("click", this.placeMarkerOnMap);
    };

    render() {
        return (
            <div className="leaflet-maps">
                <div id="map" className="map" />
                <div>
                    <b>Current position: </b>
                    <span>[{this.state.current_position}]</span>
                    <button onClick={this.findCurrentLocation}>
                        Finn min posisjon
                    </button>
                </div>
            </div>
        );
    }
}

export default Leaflet;
