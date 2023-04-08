
alt.on("speedometer:Update", UpdateVehicle);

function UpdateVehicle(street, cross, zone, dir) {
    document.getElementsByClassName('street')[0].innerHTML = street;
    document.getElementsByClassName('cross')[0].innerHTML = cross;
    document.getElementsByClassName('zone')[0].innerHTML = zone;
    document.getElementsByClassName('dir')[0].innerHTML = dir;
}