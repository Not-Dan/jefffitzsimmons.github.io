// Map components and initialization for use on web page
$(document).ready(function() {

    // Mapbox variables
    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';
    var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>'; // Attribution for copyright/fair-use


    // Layers
    var light = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr});


    // Map initialization
    var map = L.map('mainMap', {
        center: [37.8, -96],
        zoom: 4,
        maxZoom: 7,
        fullscreenControl: true,
        layers: [light]
    });


    // Declaration of global variables for functions below
    var geojson;
    var info = L.control();
    var international = L.control();

    // Show counselor info when state or county is clicked, international student info in second div
    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        // Change html elements here for styling
        this._div.innerHTML = '<h4 class=\'text-center\'>CSU-Pueblo Counselors by State</h4>' + (props ? '<h3><em><strong>' + props.name + '</em></strong></h3><div class=\'row\'><div class=\'col-xs-6 col-sm-6 col-md-12 col-lg-12\'><i class="fa fa-user" aria-hidden="true"></i><br> ' + props.counselor + '<br><i class="fa fa-envelope" aria-hidden="true"></i><br> ' + props.email + '<br><i class="fa fa-phone-square" aria-hidden="true"></i><br> ' + props.phone + '</div><div class=\'col-xs-6 col-sm-6 col-md-12 col-lg-12\'><img class=\'counselorImg\' src=' + props.imageUrl + ' alt=\'counselor image\'></div></div>': 'Click on a State or Colorado county to see who your counselor is');
    };

    international.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'international');
        this._div.innerHTML = '<h4><em><strong>International Students:</strong></em></h4><p>Information about international student counselor here...</p>';
        return this._div;
    };

    info.addTo(map);
    international.addTo(map);


    // Color states/counties differently if needed (based on property called "section" in statesData)
    function getColor(sec) {
        return sec == 1 ? '#0066ff' :
        sec == 2  ? '#33cc33' :
        sec == 3  ? '#ff0000' :
        sec == 4  ? '#cc00ff' :
        'transparent';
    }


    // Add style properties to layer elements
    function style(feature) {
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: getColor(feature.properties.section)
        };
    }


    // Add definition and border highlight to layer selected
    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
    }


    // Reset highlight
    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }


    // Highlight and zoom to state
    function zoomToFeature(e) {
        var layer = e.target;

        // Check if layer is a Colorado county: if it is, keep the zoom level and bounds on Colorado instead of zooming into the county
        if (layer.feature.id.indexOf("CO") >= 0) {
            map.fitBounds([[41.02964, -109.06128], [36.99378, -102.04102]]);
        }
        else {
            map.fitBounds(e.target.getBounds());
        }

        info.update(layer.feature.properties);
    }


    // Bring all the functions together
    function onEachFeature(feature, layer) {
        layer.on({
            // function called when pointer hovers on a state(layer)
            mouseover: highlightFeature,
            // function called when pointer leaves a state(layer)
            mouseout: resetHighlight,
            // function called when pointer clicks a state(layer)
            click: zoomToFeature
        });
    }


    // Add all the states/counties to the map
    geojson = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

});
