document.addEventListener("DOMContentLoaded", function () {

// ================= MAP =================

let map = L.map('map').setView([20,77],5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
 attribution:'Map © OSM'
}).addTo(map);

let routeControl;


// ================= SUGGEST =================

window.suggest = async function(){

    const budget = Number(document.getElementById("budget").value);
    const days = Number(document.getElementById("days").value);
    const box = document.getElementById("suggestion");

    const res = await fetch("./destinations.json");
    const db = await res.json();

    const match = db.find(d => budget>=d.min && budget<=d.max && days>=d.days);

    if(!match){
        box.innerHTML="No match found";
        return;
    }

    box.innerHTML = `
    <div class="resultCard">
        <img src="${match.img}">
        <h3>${match.name}, ${match.country}</h3>
        <button onclick="useDest('${match.name}')">Use For Route</button>
    </div>`;
}


// ================= USE DEST =================

window.useDest = function(name){
    document.getElementById("end").value = name;
}


// ================= ROUTE =================

window.showRoute = async function(){

    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

    const s = await geo(start);
    const e = await geo(end);

    if(!s || !e){
        alert("Place not found");
        return;
    }

    if(routeControl){
        map.removeControl(routeControl);
    }

    routeControl = L.Routing.control({
        waypoints:[
            L.latLng(s.lat,s.lon),
            L.latLng(e.lat,e.lon)
        ]
    })
    .on("routesfound", ev=>{
        const km=(ev.routes[0].summary.totalDistance/1000).toFixed(1);
        document.getElementById("km").innerHTML="Distance: "+km+" km";
    })
    .addTo(map);
}


// ================= GEOCODE =================

async function geo(q){
    const r=await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${q}`);
    const d=await r.json();
    return d[0];
}

});
