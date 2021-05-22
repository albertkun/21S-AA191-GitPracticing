const map = L.map('map').setView([34.0709, -118.444], 5);

const url = "https://spreadsheets.google.com/feeds/list/1upD99bKWIO68jL8MKWV67KE-_H_TVn2bCwqyQkqNsBw/oxw5dh3/public/values?alt=json"

const scroller = scrollama();


let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(map)

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)

let speakFluentEnglish = L.markerClusterGroup();
let speakOtherLanguage = L.markerClusterGroup();
// let clusterMarkers = L.markerClusterGroup();

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
        scroller
        .setup({
            step: ".step",
        })
        .onStepEnter((response) => {
            // { element, index, direction }
            console.log('hi')
        })
        .onStepExit((response) => {
            // { element, index, direction }
        });
        
}

let layers = {
	"Speaks English": speakFluentEnglish,
	"Speaks Other Languages": speakOtherLanguage
}

L.control.layers(null,layers).addTo(map)



// setup the instance, pass callback functions

// setup resize event
window.addEventListener("resize", scroller.resize);

// using d3 for convenience, and storing a selected elements
let container = d3.select('#scroll');
let graphic = container.select('.scroll__graphic');
let chart = graphic.select('.chart');
let text = container.select('.scroll__text');
let step = text.selectAll('.step');
let client;
let source;
let style;
let Cartolayer;



// initialize the scrollama
let scroller = scrollama();

// resize function to set dimensions on load and on page resize
function handleResize() {
    // 1. update height of step elements for breathing room between steps
    let stepHeight = Math.floor(window.innerHeight * 0.75);
    step.style('height', stepHeight + 'px');

    // 2. update height of graphic element
    let bodyWidth = d3.select('body').node().offsetWidth;

    graphic
        .style('height', window.innerHeight + 'px');

    // 3. update width of chart by subtracting from text width
    let chartMargin = 10;
    let textWidth = text.node().offsetWidth;
    let chartWidth = graphic.node().offsetWidth - textWidth - chartMargin;
    // make the height 1/2 of viewport
    let chartHeight = 80;

    chart
        .style('width', chartWidth + 'px')
        .style('height', chartHeight + '%');

    // 4. tell scrollama to update new element dimensions
    scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
    // response = { element, direction, index }

    // fade in current step
    step.classed('is-active', function (d, i) {
        return i === response.index;
    })

    // get attributes from element with "is-active" class
    let stepClass = document.getElementsByClassName('is-active')[0]

    let lon = stepClass.getAttribute('data-lon')
    let lat = stepClass.getAttribute('data-lat')
    let zoom = stepClass.getAttribute('data-zoom')

    // change map position and zoom level depending on data-lon, data-lat and data-zoom attribute values
    map.flyTo([lat, lon], zoom)

    // change with SQL the source of the layer
    if (response.index === 0) {
        source.setQuery(`
        SELECT * FROM populated_places_spf
        `)
    } else if (response.index === 1) {
        source.setQuery(`
        SELECT * FROM populated_places_spf WHERE adm0name = \'Spain\'
        `)
    }
    else if (response.index === 2) {
        source.setQuery(`
        SELECT * FROM populated_places_spf WHERE adm0name = \'France\'
        `)
    }
    else if (response.index === 3) {
        source.setQuery(`
        SELECT * FROM populated_places_spf WHERE adm0name = \'Portugal\'
        `)
    }

}

function handleContainerEnter(response) {
    // response = { direction }

    // sticky the graphic
    graphic.classed('is-fixed', true);
    graphic.classed('is-bottom', false);
}

function handleContainerExit(response) {
    // response = { direction }

    // un-sticky the graphic, and pin to top/bottom of container
    graphic.classed('is-fixed', false);
    graphic.classed('is-bottom', response.direction === 'down');
}

// kick-off code to run once on load
function startScroll() {
    // 1. call a resize on load to update width/height/position of elements
    handleResize();


    // 2. setup the scrollama instance
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            container: '#scroll', // our outermost scrollytelling element
            graphic: '.scroll__graphic', // the graphic
            text: '.scroll__text', // the step container
            step: '.scroll__text .step', // the step elements
            offset: 0.25, // set the trigger to be 0.25 way down screen
            debug: false, // not display the trigger offset for testing
        })
        .onStepEnter(handleStepEnter)
        .onContainerEnter(handleContainerEnter)
        .onContainerExit(handleContainerExit);

    // setup resize event
    window.addEventListener('resize', handleResize);
    cartoMap();


}
startScroll()
    //        // start it up
    //    init();
