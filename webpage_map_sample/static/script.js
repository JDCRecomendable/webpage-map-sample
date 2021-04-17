function resizeMap() {
    var navHeight = document.getElementById("navbar").offsetHeight
    var newHeight = window.innerHeight - navHeight
    document.getElementById("main-map").style.height = newHeight.toString() + "px"
}

window.onload = function() {
    resizeMap()
}

window.onresize = function() {
    resizeMap()
}
