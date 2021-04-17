var mymap = L.map('main-map').setView([lat, lon], 15);
mymap.dragging.disable()
mymap.touchZoom.disable()
mymap.doubleClickZoom.disable()
mymap.scrollWheelZoom.disable()
mymap.boxZoom.disable()
var savedCoordinates = []

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(mymap);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(mymap);

for (var i = 0; i < coordinates.length; i++) {
    savedCoordinates.push(L.marker([coordinates[i].lat, coordinates[i].lng])
        .addTo(mymap)
        .bindPopup(coordinates[i].area).openPopup()
    )
}

mymap.on('mousemove', function(event) {
    document.getElementById('side-pane-content').innerHTML = event.latlng.lat + "<br>" + event.latlng.lng
})

mymap.on("keydown", function(event) {
    if (event.originalEvent.key == " ") {
        mymap.dragging.enable()
        mymap.touchZoom.enable()
        mymap.doubleClickZoom.enable()
        mymap.scrollWheelZoom.enable()
        mymap.boxZoom.enable()
    }
})

mymap.on("keyup", function(event) {
    if (event.originalEvent.key == " ") {
        mymap.dragging.disable()
        mymap.touchZoom.disable()
        mymap.doubleClickZoom.disable()
        mymap.scrollWheelZoom.disable()
        mymap.boxZoom.disable()
    }
})
