// Define base layers
var mapboxAccessToken = config.MAPBOX_ACCESS_TOKEN;
var satelliteMap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token='+ mapboxAccessToken, {
    attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
});

var grayscaleMap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png', {
    attribution: 'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
});

var outdoorsMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
});


// Base layers for different map styles
var baseMaps = {
    "Satellite": satelliteMap,
    "Grayscale": grayscaleMap,
    "Outdoors": outdoorsMap
};

// Create overlay objects to hold the earthquake and tectonic plates layers
var overlayMaps = {
    "Earthquakes": new L.LayerGroup(),
    "Tectonic Plates": new L.LayerGroup()
};
var myMap = L.map('map', {
    center: [38, -99],
    zoom: 4,
    layers: [satelliteMap, overlayMaps["Earthquakes"], overlayMaps["Tectonic Plates"]]
});
// Add baseMaps and overlayMaps to the map as layers
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);

// Function to determine marker size based on earthquake magnitude
function markerSize(magnitude) {
    return magnitude * 20000; 
}
//Function to determine marker color based on earthquake depth
function markerColor (depth){
    return depth > 90 ? '#d73027' :
    depth > 70 ? '#fc8d59' :
    depth > 50 ? '#fee08b' :
    depth > 30 ? '#d9ef8b' :
    depth > 10 ? '#91cf60' :
                 '#1a9850';
}
// URL to the GeoJSON data
var geojsonDataUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Function to add the GeoJSON layer to the map
function addDataToMap(data){
    L.geoJson(data,{
        pointToLayer:function(feature,latlng){
            return L.circle(latlng,{
                radius: markerSize(feature.properties.mag),
                fillColor:markerColor(feature.geometry.coordinates[2]),
                color:"#000",
                weight:1,
                opacity:1,
                fillOpacity:0.8
            }).bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}<br>Depth: ${feature.geometry.coordinates[2]} km</p>`);
        }
    }).addTo(overlayMaps["Earthquakes"]);
}

d3.json(geojsonDataUrl).then(function(data){
    addDataToMap(data);
})

// Load the tectonic plates data
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(plateData) {
    L.geoJson(plateData, {
        color: "orange",
        weight: 2
    }).addTo(overlayMaps["Tectonic Plates"]);
});

// Add the earthquake and tectonic plates layers to the map
overlayMaps["Earthquakes"].addTo(myMap);
overlayMaps["Tectonic Plates"].addTo(myMap);

// Add a legend to the map
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, 10, 30, 50, 70, 90], // Define the ranges of earthquake depth
        labels = [];

    // Generate a label with a colored square for each interval
    div.innerHTML += '<strong>Depth (km)</strong><br>';
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + markerColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + ' km<br>' : '+ km');
    }

    return div;
};

legend.addTo(myMap);