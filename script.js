// =======================
// DESTINATION SUGGESTION
// =======================

async function suggest() {

    const budget = Number(document.getElementById("budget").value);
    const days = Number(document.getElementById("days").value);
    const resultBox = document.getElementById("result");

    resultBox.innerHTML = "Loading...";

    try {
        const response = await fetch("./destinations.json");
        const db = await response.json();

        const matches = db.filter(p =>
            budget >= p.minBudget &&
            budget <= p.maxBudget &&
            days >= p.days
        );

        resultBox.innerHTML = "";

        if (matches.length === 0) {
            resultBox.innerHTML = "<li>No matching destinations</li>";
            return;
        }

        matches.forEach(p => {
            const li = document.createElement("li");
            li.textContent = `${p.name} — ${p.country} — ${p.type}`;
            resultBox.appendChild(li);
        });

    } catch (err) {
        console.error(err);
        resultBox.innerHTML = "Database load error";
    }
}


// =======================
// MAP + ROUTING
// =======================

let map = L.map('map').setView([20, 77], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap'
}).addTo(map);

let routeControl;


// =======================
// ROUTE FUNCTION
// =======================

async function showRoute() {

    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

    if (!start || !end) {
        alert("Enter both locations");
        return;
    }

    const s = await geocode(start);
    const e = await geocode(end);

    if (!s || !e) {
        alert("Place not found — try bigger city");
        return;
    }

    if (routeControl) {
        map.removeControl(routeControl);
    }

    routeControl = L.Routing.control({
        waypoints: [
            L.latLng(s.lat, s.lon),
            L.latLng(e.lat, e.lon)
        ]
    }).addTo(map);
}


// =======================
// GEOCODER
// =======================

async function geocode(place) {

    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
    );

    const data = await res.json();
    return data[0];
}
