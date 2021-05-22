const map = L.map('map').setView([34.0709, -118.444], 5);

const url = "https://spreadsheets.google.com/feeds/list/1upD99bKWIO68jL8MKWV67KE-_H_TVn2bCwqyQkqNsBw/oxw5dh3/public/values?alt=json"

// create a new global scoped variable called 'scroller'
// you can think of this like the "map" with leaflet (i.e. const map = L.map('map'))
let scroller = scrollama();

let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(map)

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)

let speakFluentEnglish = L.featureGroup();
let speakOtherLanguage = L.featureGroup();

let exampleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

function addMarker(data){
    if(data.doyouspeakenglishfluently == "Yes"){
        exampleOptions.fillColor = "green"
        speakFluentEnglish.addLayer(L.circleMarker([data.lat,data.lng],exampleOptions).bindPopup(`<h2>Speak English fluently</h2>`))
        createButtons(data.lat,data.lng,data.location)
        }
    else{
        exampleOptions.fillColor = "red"
        speakOtherLanguage.addLayer(L.circleMarker([data.lat,data.lng],exampleOptions).bindPopup(`<h2>Speak other languages</h2>`))
        createButtons(data.lat,data.lng,data.location)
    }
    return data.timestamp
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("class","step")
    newButton.setAttribute("data-step",newButton.id)
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]);
    })
    const spaceForButtons = document.getElementById('contents')
    spaceForButtons.appendChild(newButton);
}

function formatData(theData){
        const formattedData = []
        const rows = theData.feed.entry
        for(const row of rows) {
          const formattedRow = {}
          for(const key in row) {
            if(key.startsWith("gsx$")) {
                  formattedRow[key.replace("gsx$", "")] = row[key].$t
            }
          }
          formattedData.push(formattedRow)
        }
        console.log(formattedData)
        formattedData.forEach(addMarker)
        speakFluentEnglish.addTo(map)
        speakOtherLanguage.addTo(map)
        let allLayers = L.featureGroup([speakFluentEnglish,speakOtherLanguage]);
        map.fitBounds(allLayers.getBounds());
        // setup the instance, pass callback functions
        // use the scrollama scroller variable to set it up
        scroller
        .setup({
            step: ".step",
        })
        // do something when you enter a "step":
        .onStepEnter((response) => {
            // you can access these objects: { element, index, direction }
            // use the function to use element attributes of the button 
            // it contains the lat/lng: 
            scrollStepper(response.element.attributes)
        })
        .onStepExit((response) => {
            // { element, index, direction }
            // left this in case you want something to happen when someone
            // steps out of a div to know what story they are on.
        });
        
}
function scrollStepper(thisStep){
    // optional: console log the step data attributes:
    // console.log("you are in thisStep: "+thisStep)
    let thisLat = thisStep.lat.value
    let thisLng = thisStep.lng.value
    // tell the map to fly to this step's lat/lng pair:
    map.flyTo([thisLat,thisLng])
}

let layers = {
	"Speaks English": speakFluentEnglish,
	"Speaks Other Languages": speakOtherLanguage
}

L.control.layers(null,layers).addTo(map)

// setup resize event for scrollama incase someone wants to resize the page...
window.addEventListener("resize", scroller.resize);
