// Initialise Map
var mymap = L.map('main-map', {
    zoomControl: false,
    center: [lat, lon],
    zoom: 15
})

// Disable zooming and dragging
// mymap.dragging.disable()
// mymap.touchZoom.disable()
// mymap.doubleClickZoom.disable()
// mymap.scrollWheelZoom.disable()
// mymap.boxZoom.disable()

// Save coordinates in an array and associated data
var savedCoordinates = []

// Add standard layer
var osm = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(mymap);

// Add satellite layer
var sat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(mymap);

// Add layers to base layer
var baseLayers = {
    'Standard': osm,
    'Satellite': sat
}

// Add controls to switch between layers
L.control.layers(
    baseLayers,
    {},
    {
        position: 'bottomleft'
    }
).addTo(mymap)

// Add zoom controls
L.control.zoom({
    position: 'topright'
}).addTo(mymap)

console.log(coordinates)

// Add markers on the map
for (var i = 0; i < coordinates.length; i++) {
    savedCoordinates.push(L.rectangle([coordinates[i].tleft, coordinates[i].bright])
        .addTo(mymap)
        .bindPopup(coordinates[i].area).openPopup()
    )
}

// Dynamically change elements
// mymap.on('mousemove', function(event) {
//     document.getElementById('side-pane-content').innerHTML = event.latlng.lat + "<br>" + event.latlng.lng
// })

for (var i = 0; i < savedCoordinates.length; i++) {
    savedCoordinates[i].on('mouseover', function(event) {
        var tleft = event.sourceTarget._latlngs[0][1]
        var bright = event.sourceTarget._latlngs[0][3]
        document.getElementById('side-pane').style.opacity = 100
        document.getElementById('side-pane').style.pointerEvents = "auto"
        document.getElementById('side-pane-content').innerHTML += tleft + "<br>" + bright
    })

    savedCoordinates[i].on('mouseout', function(event) {
        document.getElementById('side-pane').style.opacity = 0
        document.getElementById('side-pane').style.pointerEvents = "none"
    })
}

// mymap.on("keydown", function(event) {
//     if (event.originalEvent.key == " ") {
//         mymap.dragging.enable()
//         mymap.touchZoom.enable()
//         mymap.doubleClickZoom.enable()
//         mymap.scrollWheelZoom.enable()
//         mymap.boxZoom.enable()
//     }
// })

// mymap.on("keyup", function(event) {
//     if (event.originalEvent.key == " ") {
//         mymap.dragging.disable()
//         mymap.touchZoom.disable()
//         mymap.doubleClickZoom.disable()
//         mymap.scrollWheelZoom.disable()
//         mymap.boxZoom.disable()
//     }
// })
