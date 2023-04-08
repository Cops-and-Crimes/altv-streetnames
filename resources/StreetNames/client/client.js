import * as alt from 'alt-client';
import * as native from 'natives';

let street = new alt.WebView("http://resource/client/cef/index.html");
const player = alt.Player.local;

const updateInterval = 500; 

let getStreet;
let streetName;
let crossingName;
let zoneName;
let direction;

alt.setInterval(() => {
    getStreet = native.getStreetNameAtCoord(player.pos.x, player.pos.y, player.pos.z);

    streetName = native.getStreetNameFromHashKey(getStreet[1]);
    crossingName = native.getStreetNameFromHashKey(getStreet[2]);
    zoneName = native.getFilenameForAudioConversation(native.getNameOfZone(player.pos.x, player.pos.y, player.pos.z));

    direction = getDirection(player);
}, updateInterval);

function getDirection(entity) {
    let angle = native.getEntityHeading(entity);
    const directions = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE'];
    const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    return directions[index];
}
alt.everyTick(() => {
    if (!street) return;
    let crossing;
    
    if(crossingName != "") { crossing = `/ ${crossingName}`; } else { crossing = ""; }
    street.emit("speedometer:Update", streetName, crossing, zoneName, direction)
})