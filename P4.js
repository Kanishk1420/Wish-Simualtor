const wishButton = document.getElementById("wish");
const wishingButton = document.getElementById("wishing");
const tableBody = document.getElementById("table-body");
const totalWishesElement = document.getElementById("total-wishes");
const primogemsElement = document.getElementById("primogems");
const table = document.querySelector(".table");
const maxRows = 10;
const softPity = 65;
const hardPity = 90;
let totalWishes = 0;
let totalPrimogems = 0;
let pityCounter = 0;
let fourStarCounter = 0;

function addRow(name, pity) {
    if (tableBody.rows.length >= maxRows) {
        tableBody.deleteRow(0); // Remove the oldest row
    }
    const row = document.createElement("tr");
    row.innerHTML = `<td>${name}</td><td>${pity}</td>`;
    row.style.fontSize = "16px"; // Increase font size
    if (name === "Yelan") {
        row.style.color = "rgb(255 177 63)"; // Golden text for Yelan
        row.style.fontWeight = "600"; // Bold text for Yelan
    } else if (["Yanfei", "Xianling", "Razor", "Sucrose"].includes(name)) {
        row.style.color = "rgb(193 110 198)"; // Purple text for 4-star characters
        row.style.fontWeight = "600"; // Bold text for 4-star characters
    }
    else if([ "Dark Iron Sword","Fillet Blade","Harbinger of Dawn","Skyrider Sword","Messenger","Raven Bow","Recurve Bow","Sharpshooter","Slingshot","Emerald Orb"].includes(name)) {
        row.style.color = "rgb(78 124 255)";
        row.style.fontWeight = "600";
    }
    tableBody.appendChild(row);
}

function generateRandomData() {
    const names = [
        "Yelan",
        "Yanfei",
        "Xianling",
        "Razor",
        "Sucrose",
        "Dark Iron Sword",
        "Fillet Blade",
        "Harbinger of Dawn",
        "Skyrider Sword",
        "Messenger",
        "Raven Bow",
        "Recurve Bow",
        "Sharpshooter",
        "Slingshot",
        "Emerald Orb",
    ];
    let name;
    const randomValue = Math.random();
    const fourStarProbability = 0.05; // Adjust this value for a slight chance of getting a 4-star character
    const fiveStarProbability = 0.02; // 2% chance for Yelan before soft pity

    if (pityCounter >= hardPity) {
        name = "Yelan"; // Guarantee Yelan at hard pity
    } else if (pityCounter >= softPity) {
        // Increase probability of getting Yelan after soft pity
        const increasedProbability = fiveStarProbability + (pityCounter - softPity) * 0.01;
        if (randomValue < increasedProbability) {
            name = "Yelan";
        } else if (randomValue < increasedProbability + fourStarProbability || fourStarCounter >= 9) {
            name = names[Math.floor(Math.random() * 4) + 1]; // Select from 4-star characters
            fourStarCounter = 0; // Reset the 4-star counter
        } else {
            name = names[Math.floor(Math.random() * (names.length - 5)) + 5]; // Select from 3-star items
        }
    } else {
        if (randomValue < fiveStarProbability) { // 2% chance for Yelan before soft pity
            name = "Yelan";
        } else if (randomValue < fiveStarProbability + fourStarProbability || fourStarCounter >= 9) {
            name = names[Math.floor(Math.random() * 4) + 1]; // Select from 4-star characters
            fourStarCounter = 0; // Reset the 4-star counter
        } else {
            name = names[Math.floor(Math.random() * (names.length - 5)) + 5]; // Select from 3-star items
        }
    }
    totalWishes++;
    pityCounter++;
    fourStarCounter++;
    totalPrimogems += 160; // Add 160 primogems per wish
    updateCounters();
    if (name === "Yelan") {
        const pity = pityCounter; // Capture the pity count when Yelan is obtained
        pityCounter = 0; // Reset pity counter
        return { name, pity };
    }
    return { name, pity: pityCounter };
}

function updateCounters() {
    totalWishesElement.innerText = `Total Wishes: ${totalWishes}`;
    primogemsElement.innerText = `Primogems Used: ${totalPrimogems}`;
}

function showTable() {
    table.classList.add("show");
}

wishButton.addEventListener("click", () => {
    const data = generateRandomData();
    addRow(data.name, data.pity);
    showTable();
});

wishingButton.addEventListener("click", () => {
    for (let i = 0; i < 10; i++) {
        const data = generateRandomData();
        addRow(data.name, data.pity);
    }
    totalPrimogems += 0; // Add 1600 primogems for 10 wishes
    updateCounters();
    showTable();
});
