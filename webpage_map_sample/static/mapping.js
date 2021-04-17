// Initialise Map
var mymap = L.map('main-map', {
    zoomControl: false,
    center: [lat, lon],
    zoom: initialZoom
})

// // Disable zooming and dragging
// mymap.dragging.disable()
// mymap.touchZoom.disable()
// mymap.doubleClickZoom.disable()
// mymap.scrollWheelZoom.disable()
// mymap.boxZoom.disable()

// Save coordinates in an array and associated data
var savedCoordinates = []

// Save coordinates on for mouse and keyboard events
var coordinatesOnClick = []
var coordinatesOnRelease = []
var mouseCoordinatesOnClick = []
var spacePressed = [false]
var shiftPressed = [false]
var selectionDiv = []
var geocodeSetting = [lat, lon]
var zoomSetting = [initialZoom]

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

// console.log(coordinates)

// Add markers on the map
for (var i = 0; i < coordinates.length; i++) {
    savedCoordinates.push(L.rectangle([coordinates[i].tleft, coordinates[i].bright])
        .addTo(mymap)
        // .bindPopup(coordinates[i].area).openPopup()
    )
}

// Dynamically change elements
// mymap.on('mousemove', function(event) {
//     document.getElementById('side-pane-content').innerHTML = event.latlng.lat + "<br>" + event.latlng.lng
// })

// for (var i = 0; i < savedCoordinates.length; i++) {
//     savedCoordinates[i].on('mouseover', function(event) {
//         var tleft = event.sourceTarget._latlngs[0][1]
//         var bright = event.sourceTarget._latlngs[0][3]
//         document.getElementById('side-pane').style.opacity = 100
//         document.getElementById('side-pane').style.pointerEvents = "auto"
//         document.getElementById('side-pane-content').innerHTML = tleft + "<br>" + bright
//     })

//     savedCoordinates[i].on('mouseout', function(event) {
//         document.getElementById('side-pane').style.opacity = 0
//         document.getElementById('side-pane').style.pointerEvents = "none"
//     })
// }

mymap.on("keydown", function(event) {
    if (event.originalEvent.key == " ") {
        // mymap.dragging.enable()
        // mymap.touchZoom.enable()
        // mymap.doubleClickZoom.enable()
        // mymap.scrollWheelZoom.enable()
        // mymap.boxZoom.enable()

        // Change state of spacePressed
        spacePressed.length = 0
        spacePressed.push(true)
    }

    if (event.originalEvent.key == "Shift") {
        shiftPressed.length = 0
        shiftPressed.push(true)
    }
})

mymap.on("keyup", function(event) {
    if (event.originalEvent.key == " ") {
        // mymap.dragging.disable()
        // mymap.touchZoom.disable()
        // mymap.doubleClickZoom.disable()
        // mymap.scrollWheelZoom.disable()
        // mymap.boxZoom.disable()

        // Change state of spacePressed
        spacePressed.length = 0
        spacePressed.push(false)
    }
})

function recordArray(array, event) {
    var lat = event.latlng.lat
    var lng = event.latlng.lng
    array.length = 0
    array.push(lat)
    array.push(lng)
}

mymap.on("zoomend", function(event) {
    zoomSetting.length = 0
    zoomSetting.push(mymap.getZoom())
})

mymap.on("mousedown", function(event) {
    if (spacePressed[0] == false) {
        recordArray(coordinatesOnClick, event)
        console.log(coordinatesOnClick)
        // var selection = document.createElement('div')
        // selection.id = "selection"
        // selection.style.position = "absolute"
        // selection.style.left = event.originalEvent.pageX.toString() + "px"
        // selection.style.top = event.originalEvent.pageY.toString() + "px"
        // mouseCoordinatesOnClick.push(event.originalEvent.pageX)
        // mouseCoordinatesOnClick.push(event.originalEvent.pageY)
        // selection.style.width = 0
        // selection.style.height = 0
        // selection.style.backgroundColor = "black"
        // selectionDiv.length = 0
        // selectionDiv.push(selection)
        // document.body.appendChild(selection)
    }

    if (event.originalEvent.key == "Shift") {
        shiftPressed.length = 0
        shiftPressed.push(false)
    }
})

function updateGeocode() {
    var bounds = mymap.getBounds()
    geocodeSetting.length = 0
    geocodeSetting.push(bounds.getCenter().lat, bounds.getCenter().lng)
}

mymap.on("mousemove", function(event) {
    updateGeocode()
})

mymap.on("load", function(event) {
    updateGeocode()
})

//     if (spacePressed[0] == false) {
//         if (selectionDiv.length > 0) {
//             var intendedWidth = Math.abs(event.originalEvent.pageX - mouseCoordinatesOnClick[0])
//             var intendedHeight = Math.abs(event.originalEvent.pageY - mouseCoordinatesOnClick[1])
//             selectionDiv[0].style.width = intendedWidth.toString() + "px"
//             selectionDiv[0].style.height = intendedHeight.toString() + "px"

//             if (event.originalEvent.pageX < mouseCoordinatesOnClick[0]) {
//                 selectionDiv[0].style.left = event.originalEvent.pageX.toString() + "px"
//             } else {
//                 selectionDiv[0].style.left = mouseCoordinatesOnClick[0]
//             }

//             if (event.originalEvent.pageY < mouseCoordinatesOnClick[1]) {
//                 selectionDiv[0].style.top = event.originalEvent.pageY.toString() + "px"
//             } else {
//                 selectionDiv[0].style.top = mouseCoordinatesOnClick[1]
//             }

//             // console.log(selectionDiv[0].style.left)
//             // console.log(selectionDiv[0].style.width)
//             console.log(selectionDiv[0])
//         }
//     }
// })

function post_coordinates(path, params, method='post') {
    // The rest of this code assumes you are not using a library.
    // It can be made less verbose if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}
  

mymap.on("mouseup", function(event) {
    if (spacePressed[0] == false) {
        recordArray(coordinatesOnRelease, event)
        console.log(coordinatesOnRelease)
        console.log(tleft.tleft)
        console.log(bright.bright)
    //     console.log(coordinatesOnRelease)

    //     if  (selectionDiv.length > 0) {
    //         document.body.removeChild(selectionDiv[0])
    //         selectionDiv.length = 0
    //     }
    }

    console.log(shiftPressed[0])
    
    if (shiftPressed[0] == true) {
        console.log(coordinatesOnClick)
        post_coordinates('/', {
            tleft: coordinatesOnClick,
            bright: coordinatesOnRelease,
            year: currentYear,
            updateScore: true,
            geocode: geocodeSetting,
            zoom: zoomSetting
        })
    }
})

function nextYear() {
    post_coordinates('/', {
        tleft: tleft.tleft,
        bright: bright.bright,
        year: currentYear + 1,
        updateScore: false,
        geocode: geocodeSetting,
        zoom: zoomSetting
    })
}

function prevYear() {
    post_coordinates('/', {
        tleft: tleft.tleft,
        bright: bright.bright,
        year: currentYear - 1,
        updateScore: false,
        geocode: geocodeSetting,
        zoom: zoomSetting
    })
}
