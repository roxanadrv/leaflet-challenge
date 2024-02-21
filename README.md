# Earthquake and Tectonic Plates Visualization
## Background
This project, developed for the United States Geological Survey (USGS), visualizes earthquake data to enhance public and governmental understanding of natural hazards. Utilizing Leaflet, an open-source JavaScript library, this tool plots earthquakes on a map, indicating their magnitude and depth through varying marker sizes and colors. Additionally, the project overlays tectonic plate boundaries to illustrate the relationship between seismic activity and plate tectonics.

## Repository Structure
Leaflet-Part-1/: Contains the initial visualization of earthquake data.
Leaflet-Part-2/: Expands upon the initial visualization by adding tectonic plate data, multiple base maps, and layer controls.
config/: Stores configuration files, including API keys.
.gitignore: Specifies intentionally untracked files that Git should ignore.

## Features
Dynamic Earthquake Visualization: Plots real-time earthquake data, showing the magnitude and depth of each earthquake.
Tectonic Plates Overlay: Displays the boundaries of the Earth's tectonic plates.
Interactive Map Layers: Users can toggle between different base maps (Satellite, Grayscale, Outdoors) and overlays (Earthquakes, Tectonic Plates).
Responsive Design: Ensures accessibility across various devices and screen sizes.


## Getting Started
### Prerequisites
- A modern web browser.
- A Mapbox API access token. Visit Mapbox to create an account and obtain a token.
  
### Installation
- Clone this repository to your local machine.
- Navigate to the config/ directory within Leaflet-Part-2/.
- Create a config.js file and insert your Mapbox API access token:
            // config/config.js
            var config = {
                MAPBOX_ACCESS_TOKEN: 'YOUR_MAPBOX_ACCESS_TOKEN'
            };
- Open index.html within Leaflet-Part-1/ or Leaflet-Part-2/ in your web browser to view the map.
  
## Built With
Leaflet - an open-source JavaScript library for mobile-friendly interactive maps.
D3.js - a JavaScript library for manipulating documents based on data.

## Data Sources
- Earthquake Data: Real-time data from the USGS GeoJSON Feed.
- Tectonic Plates Data: Fraxen's tectonicplates GitHub repository.
