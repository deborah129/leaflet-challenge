
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Perform a GET request to the query URL
d3.json(url, function (data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }


    function earthquakecolors(mag) {
        if (mag > 5) { return "red" }
        else if (mag > 4) { return "LightPink" }
        else if (mag > 3) { return " orange" }
        else if (mag > 2) { return " yellow" }
        else if (mag > 1) { return "lightgreen" }
        return "PowderBlue";
    }
    function style(feature) {
        //console.log(feature.properties.mag);
        return {
            radius: +feature.properties.mag * 4,
            fillColor: earthquakecolors(feature.properties.mag),
            color: "black",
            weight: 1,
            fillOpacity: 0.75,
        }
    };
    function circlemarkers(feature, coordinates) {
        return L.circleMarker(coordinates)
    }
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        style: style,
        pointToLayer: circlemarkers
    });

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {

    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Light Map": streetmap,
        "Dark Map": darkmap
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [streetmap, earthquakes]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "info legend");
        var labels = ["Mag >5", "Mag 4-5", "Mag 3-4", "Mag 2-3", "Mag 1-2", "Mag <1"];
        var colors = ["red", "LightPink", "orange", "yellow", "lightgreen", "PowderBlue"];



        // // Add min & max
        // var legendInfo = "<h1>Median Income</h1>" +
        //     "<div class=\"labels\">" +
        //     "<div class=\"min\">" + limits[0] + "</div>" +
        //     "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        //     "</div>";
        for (var i = 0; i < labels.length; i++) {
            div.innerHTML += 
            // '<i style="background:' + colors[i] + '"></i> ' +
            // labels[i] + (labels[i + 1] ? '&ndash;' + labels[i + 1] + '<br>' : '+');
           
            '<i style="background:' + colors[i] + '"></i> ' +
            labels[i] + '<br>';



        }
        // div.innerHTML = labels.join('<br>');
        return div;

    }
    // div.innerHTML = legendInfo;

    // limits.forEach(function (limit, index) {
    // labels.push("<li style=\"background-color: " + colors[index] + "\"></li>")
    legend.addTo(myMap);
};
