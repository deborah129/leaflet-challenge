var mymap = L.map('map').setView([36.8796206, -94.21875], 3);

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 15,
    id: "mapbox.light",
    accessToken: API_KEY
}).addTo(mymap);



const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

var earthquakeData = [];
d3.json(url, data => {
    //createFeatures(data.features);
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        earthquakeData.push(L.circle(data.features.geometry.coordinates[0], data.features.geometry.coordinates[1]), {
            stroke: false,
            fillOpacity: 0.75,
            color: "red",
            radius: 100000
        })
            .addTo(mymap);
    }

    // function createFeatures(earthquakeData){



    //  function onEachFeature(feature, layer){
    //      layer.bindPopup("<h3>"+ feature.properties.place+"</h3>");
    //  }
    //  var earthquakes = L.geoJson(earthquakeData, {
    //      onEachFeature: onEachFeature
    //  });
    // //         // style: function (feature) {
    // //         //     return {
    // //         //         color: "red",
    // //         //         //fillColor: chooseColor(features.properties.mag),
    // //         //         fillOpacity: 0.5,
    // //         //         weight: 1.5
    // //           });
    //       //
    //     onEachFeature: function (feature, layer) {
    //         layer.on({
    //             mouseover: function (event) {
    //                 layer = event.target;
    //                 layer.setStyle({
    //                     fillOpacity: 0.9
    //                 });
    //             },
    //             mouseout: function (event) {
    //                 layer = event.target;
    //                 layer.setStyle({
    //                     fillOpacity: 0.5
    //                 });
    //             },
    //         })
    //     layer.bindPopup("<h1>" + data.features.mag+ "</h1>");
    // // }
    //
});

// var marker = L.marker([40.634400, -74.319370]).addTo(mymap);
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();