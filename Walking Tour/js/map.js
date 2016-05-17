var map;
function initmap() {
  map = new L.map('map');
  // Add basemap from OSM
  var osmHot = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttributes = 'Map Data @ <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>';
  var osm = new L.tileLayer(osmHot, {
    minZoom: 15,
    maxZoom: 19,
    attribution: osmAttributes,
    zoomControl: true
  });
  map.setView(new L.LatLng(37.499, -79.878), 17);
  map.addLayer(osm);
};
initmap();
function onEachFeature(feature, layer) {
  layer.on({
    click: function populate() {
      document.getElementById('location').innerHTML = feature.properties.address;
      document.getElementById('header').innerHTML = "<p id='BuildingHeader'>Building Name: </p>" + feature.properties.name;
      document.getElementById('description').innerHTML = feature.properties.Desc;
    }
  })
};
$.getJSON("https://rawgit.com/beattyre/WebMapTest/gh-pages/TourSites_YRBuilt.geojson", function(data) {
  L.geoJson(data, {
    pointToLayer: function(feature, latlng){
    	var stopNumber = feature.properties.Stop_No
    	var numberIcon = L.ExtraMarkers.icon({
  	icon: 'fa-number',
  	markerColor: 'blue',
  	iconColor: 'white',
  	shape: 'circle',
  	prefix: 'fa',
  	number: stopNumber
  })
      var marker = L.marker(latlng, {icon: numberIcon});
      return marker;
    },
    onEachFeature: onEachFeature
  }).addTo(map);
});
L.control.locate({
	position: 'topright'
}).addTo(map);
map.zoomControl.setPosition('topright');