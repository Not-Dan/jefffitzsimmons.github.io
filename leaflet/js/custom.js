// Map components and initialization for use on web page
$(document).ready(function() {

    // Mapbox variables
    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY3N1cHVlYmxvd2ViZGV2IiwiYSI6ImNpcGp2c3RkbDAxeHJ1Z25qbGlhdmhydXcifQ.yUVMnSrhzyGrHNG4n0Ae0A';
    var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>';


    // Open Street Map variables
    var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    var osmAttr = 'Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';


    // Layers
    var satelliteStreets = L.tileLayer(mbUrl, {id: 'mapbox.streets-satellite', attribution: mbAttr});
    var streets = L.tileLayer(osmUrl, {attribution: osmAttr});
    var adminBuildings =  new L.layerGroup(); // Buildings will be added as markers are added -- Admin Buildings
    var residenceBuildings =  new L.layerGroup(); // Buildings will be added as markers are added -- Residence Buildings
    var sportsFields =  new L.layerGroup(); // Buildings will be added as markers are added -- sports fields
    var resturaunts =  new L.layerGroup(); // Buildings will be added as markers are added -- sports fields
    var hotels =  new L.layerGroup(); // Buildings will be added as markers are added -- sports fields
    var attractions =  new L.layerGroup(); // Buildings will be added as markers are added -- sports fields


    // Map initialization
    var map = L.map('mainMap', {
        center: [38.30786, -104.57769],
        zoom: 17,
        maxZoom: 18,
        minZoom: 16,
        fullscreenControl: true,
        scrollWheelZoom: false,
        layers: [streets, adminBuildings, residenceBuildings, sportsFields, resturaunts, attractions, hotels]
    });

//Admin and Academic Buildings
    // Map markers for buildings
    var geojson;
    var markerList = document.getElementById('marker-list');

    // Read the JSON array and add information to variables
    geojson = L.geoJson(adminData, {
        onEachFeature: function(feature, layer) {
            var buildingMarker = L.marker(feature.geometry.coordinates, {icon: blueIcon}),
            image = '<img src=\'' + feature.properties.imageUrl + '\' width=\'100%\'>',
            buildingName = '<h4>' + feature.properties.name + '</h4>',
            buildingInfo = '<p>' + feature.properties.popupContent + '</p>',
            infoLink = '<a href=\'' + feature.properties.linkUrl + '\' target=\'_blank\'>More Information</a>';
            buildingMarker.bindPopup('<div id=\"mapMarkers\">' + image + buildingName + buildingInfo + infoLink + '</div>', {
                keepInView: true
            }
        ).addTo(adminBuildings);

        // Create, style, and populate building links list below the map
        var item = markerList.appendChild(document.createElement('button'));
        item.className = "list-group-item";
        item.innerHTML = feature.properties.name;
        item.onclick = function() {
            map.setView(feature.geometry.coordinates);
            buildingMarker.openPopup();
            $('html, body').animate({
                scrollTop: $('#mainMap')
            }, 175);
        };
    }
}).addTo(map);
//Residence Halls
            // Map markers for buildings
    var geojsonRes;
    var resMarkerList = document.getElementById('res-marker-list');

    // Read the JSON array and add information to variables
    geojsonRes = L.geoJson(resData, {
        onEachFeature: function(feature, layer) {
            var buildingMarker = L.marker(feature.geometry.coordinates,{icon: redIcon}),
            image = '<img src=\'' + feature.properties.imageUrl + '\' width=\'100%\'>',
            buildingName = '<h4>' + feature.properties.name + '</h4>',
            buildingInfo = '<p>' + feature.properties.popupContent + '</p>',
            infoLink = '<a href=\'' + feature.properties.linkUrl + '\' target=\'_blank\'>More Information</a>';
            buildingMarker.bindPopup('<div id=\"mapMarkers\">' + image + buildingName + buildingInfo + infoLink + '</div>', {
                keepInView: true
            }
        ).addTo(residenceBuildings);

        // Create, style, and populate building links list below the map
        var item = resMarkerList.appendChild(document.createElement('button'));
        item.className = "list-group-item";
        item.innerHTML = feature.properties.name;
        item.onclick = function() {
            map.setView(feature.geometry.coordinates);
            buildingMarker.openPopup();
            $('html, body').animate({
                scrollTop: $('#mainMap')
            }, 175);
        };
    }
}).addTo(map);

//Sports Fields
            // Map markers for buildings
    var geojsonField;
    var fieldMarkerList = document.getElementById('field-marker-list');
    geojsonField = L.geoJson(fieldData, {
        onEachFeature: function(feature, layer) {
            var buildingMarker = L.marker(feature.geometry.coordinates,{icon: greenIcon}),
            image = '<img src=\'' + feature.properties.imageUrl + '\' width=\'100%\'>',
            buildingName = '<h4>' + feature.properties.name + '</h4>',
            buildingInfo = '<p>' + feature.properties.popupContent + '</p>',
            infoLink = '<a href=\'' + feature.properties.linkUrl + '\' target=\'_blank\'>More Information</a>';
            buildingMarker.bindPopup('<div id=\"mapMarkers\">' + image + buildingName + buildingInfo + infoLink + '</div>', {
                keepInView: true
            }
        ).addTo(sportsFields);

        // Create, style, and populate building links list below the map
        var item = fieldMarkerList.appendChild(document.createElement('button'));
        item.className = "list-group-item";
        item.innerHTML = feature.properties.name;
        item.onclick = function() {
            map.setView(feature.geometry.coordinates);
            buildingMarker.openPopup();
            $('html, body').animate({
                scrollTop: $('#mainMap')
            }, 175);
        };
    }
}).addTo(map);

//Resturaunts
            // Map markers for buildings
    var geojsonResturaunts;
    var resturauntMarkerList = document.getElementById('resturaunt-marker-list');
    geojsonResturaunts = L.geoJson(resturauntData, {
        onEachFeature: function(feature, layer) {
            var buildingMarker = L.marker(feature.geometry.coordinates,{icon: yellowIcon}),
            image = '<!-- <img src=\'' + feature.properties.imageUrl + '\' width=\'100%\'> -->',
            buildingName = '<h4>' + feature.properties.name + '</h4>',
            buildingInfo = '<!-- <p>' + feature.properties.popupContent + '</p> -->',
            infoLink = '<a href=\'' + feature.properties.linkUrl + '\' target=\'_blank\'>More Information</a>';
            buildingMarker.bindPopup('<div id=\"mapMarkers\">' + image + buildingName + buildingInfo + infoLink + '</div>', {
                keepInView: true
            }
        ).addTo(resturaunts);

                // Create, style, and populate building links list below the map
        var item = resturauntMarkerList.appendChild(document.createElement('button'));
        item.className = "list-group-item";
        item.innerHTML = feature.properties.name;
        item.onclick = function() {
            map.setView(feature.geometry.coordinates);
            buildingMarker.openPopup();
            $('html, body').animate({
                scrollTop: $('#mainMap')
            }, 175);
        }
    }
}).addTo(map);

//Hotels
            // Map markers for buildings
    var geojsonHotel;
    var hotelMarkerList = document.getElementById('hotel-marker-list');
    geojsonHotel = L.geoJson(hotelData, {
        onEachFeature: function(feature, layer) {
            var buildingMarker = L.marker(feature.geometry.coordinates,{icon: violetIcon}),
            image = '<!-- <img src=\'' + feature.properties.imageUrl + '\' width=\'100%\'> -->',
            buildingName = '<h4>' + feature.properties.name + '</h4>',
            buildingInfo = '<!-- <p>' + feature.properties.popupContent + '</p> -->',
            infoLink = '<a href=\'' + feature.properties.linkUrl + '\' target=\'_blank\'>More Information</a>';
            buildingMarker.bindPopup('<div id=\"mapMarkers\">' + image + buildingName + buildingInfo + infoLink + '</div>', {
                keepInView: true
            }
        ).addTo(hotels);

                // Create, style, and populate building links list below the map
        var item = hotelMarkerList.appendChild(document.createElement('button'));
        item.className = "list-group-item";
        item.innerHTML = feature.properties.name;
        item.onclick = function() {
            map.setView(feature.geometry.coordinates);
            buildingMarker.openPopup();
            $('html, body').animate({
                scrollTop: $('#mainMap')
            }, 175);
        }
    }
}).addTo(map);

//Resturaunts
            // Map markers for buildings
    var geojsonAttraction;
    var attractionMarkerList = document.getElementById('attraction-marker-list');
    geojsonAttraction = L.geoJson(attractionData, {
        onEachFeature: function(feature, layer) {
            var buildingMarker = L.marker(feature.geometry.coordinates,{icon: greyIcon}),
            image = '<!-- <img src=\'' + feature.properties.imageUrl + '\' width=\'100%\'> -->',
            buildingName = '<h4>' + feature.properties.name + '</h4>',
            buildingInfo = '<!-- <p>' + feature.properties.popupContent + '</p> -->',
            infoLink = '<a href=\'' + feature.properties.linkUrl + '\' target=\'_blank\'>More Information</a>';
            buildingMarker.bindPopup('<div id=\"mapMarkers\">' + image + buildingName + buildingInfo + infoLink + '</div>', {
                keepInView: true
            }
        ).addTo(attractions);

                // Create, style, and populate building links list below the map
        var item = attractionMarkerList.appendChild(document.createElement('button'));
        item.className = "list-group-item";
        item.innerHTML = feature.properties.name;
        item.onclick = function() {
            map.setView(feature.geometry.coordinates);
            buildingMarker.openPopup();
            $('html, body').animate({
                scrollTop: $('#mainMap')
            }, 175);
        }
    }
}).addTo(map);

// Set up initial layer and marker UI options
var baseLayers = {
    "Flat": streets,
    "Satellite": satelliteStreets
};

var overlayMaps = {
    "Academic & Administrative Buildings": adminBuildings,
    "Residence Halls": residenceBuildings,
    "Fields & Recreation": sportsFields,
    "Hotels & Transportation": hotels,
    "Resturaunts": resturaunts,
    "Pueblo Attractions": attractions
};


// Add layer and marker UI controls to map
L.control.layers(baseLayers, overlayMaps).addTo(map);


// Initial function set to determine lat and lng of a specific point, use for setting new building markers/polygons //
//
 var popup = L.popup();

 function onMapClick(e) {
     popup
     .setLatLng(e.latlng)
     .setContent("You clicked the map at " + e.latlng.toString())
     .openOn(map);
 }

 map.on('click', onMapClick);
//
// Initial function set to determine lat and lng of a specific point, use for setting new building markers/polygons //


});
