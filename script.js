function suggestTrip() {
    // 1. Get values from the user
    const totalBudget = parseFloat(document.getElementById('totalBudget').value);
    const totalDays = parseInt(document.getElementById('totalDays').value);
    
    // 2. Simple validation
    if (!totalBudget || !totalDays || totalBudget <= 0 || totalDays <= 0) {
        alert("Please enter valid numbers!");
        return;
    }

    // 3. Calculate daily allowance
    const dailyBudget = totalBudget / totalDays;
    
    let destination = "";
    let info = "";
    let costEstimate = 0;

    // 4. Recommendation Logic
    if (dailyBudget < 40) {
        destination = "Hanoi, Vietnam";
        info = "Incredible street food and rich history for budget travelers.";
        costEstimate = 30;
    } else if (dailyBudget < 100) {
        destination = "Lisbon, Portugal";
        info = "Beautiful tiles, hills, and great wine at a moderate price.";
        costEstimate = 75;
    } else if (dailyBudget < 250) {
        destination = "Tokyo, Japan";
        info = "A perfect blend of tradition and future. Amazing sushi!";
        costEstimate = 180;
    } else {
        destination = "Reykjavik, Iceland";
        info = "Expensive but breathtaking landscapes and the Northern Lights.";
        costEstimate = 300;
    }

    // 5. Show the result
    document.getElementById('destination-name').innerText = destination;
    document.getElementById('destination-info').innerText = info;
    document.getElementById('daily-cost').innerText = costEstimate;
    document.getElementById('result-container').classList.remove('hidden');
}