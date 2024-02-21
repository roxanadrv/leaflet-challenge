var myMap = L.map('map', {
    center: [39.8283, -98.5795],
    zoom: 5
});
// Use the standard Leaflet tile layer provider
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(myMap);

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
function addDataToMap(data,map){
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
    }).addTo(map);
}

d3.json(geojsonDataUrl).then(function(data){
    addDataToMap(data,myMap);
})

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