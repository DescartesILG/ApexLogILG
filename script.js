const shipSelect = document.getElementById("ship");
const shipDisplay = document.getElementById("ship-display");

// Map ship names to their JSON files
const shipFiles = {
    "Jaegar": "data/jaegar.json",
    "Io": "data/io.json"
};

shipSelect.addEventListener("change", () => {
    const selectedShip = shipSelect.value;
    if (!selectedShip) {
        shipDisplay.innerHTML = "";
        return;
    }

    const jsonFile = shipFiles[selectedShip];
    fetch(jsonFile)
        .then(res => res.json())
        .then(data => displayShipVariants(data))
        .catch(err => {
            console.error("Error loading JSON:", err);
            shipDisplay.innerHTML = "<p>Error loading ship data.</p>";
        });
});

function displayShipVariants(data) {
    shipDisplay.innerHTML = ""; // clear previous

    Object.keys(data).forEach(variantName => {
        const variantData = data[variantName];

        const tile = document.createElement("div");
        tile.className = "ship-tile";

        const title = document.createElement("h3");
        title.textContent = variantName;
        tile.appendChild(title);

        const table = document.createElement("table");
        const headerRow = document.createElement("tr");
        ["Level","HP","Buffs"].forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        ["Base Model","Apex 5","Apex 10","Apex 15","Apex 20"].forEach(level => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${level}</td><td>${variantData[level].hp}</td><td>${variantData[level].buffs}</td>`;
            table.appendChild(row);
        });

        tile.appendChild(table);
        shipDisplay.appendChild(tile);
    });
}
