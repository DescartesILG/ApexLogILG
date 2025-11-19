let allData = {}; // store loaded JSON
const shipClassSelect = document.getElementById("ship-class");
const shipSelect = document.getElementById("ship");
const shipDisplay = document.getElementById("ship-display");

// Capitalize function (optional, for nicer display)
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// When ship class changes
shipClassSelect.addEventListener("change", () => {
    const selectedClass = shipClassSelect.value;
    if (!selectedClass) return;

    // For now, we are testing only cruiser
    if (selectedClass === "cruiser") {
        fetch("data/cruiser.json")
            .then(res => res.json())
            .then(data => {
                allData = data;
                populateShipDropdown(data);
                shipDisplay.innerHTML = ""; // clear previous display
            });
    } else {
        shipSelect.innerHTML = '<option value="">--Select Ship--</option>';
        shipDisplay.innerHTML = "";
    }
});

// Populate the ship dropdown
function populateShipDropdown(data) {
    shipSelect.innerHTML = '<option value="">--Select Ship--</option>';
    Object.keys(data).forEach(shipName => {
        const option = document.createElement("option");
        option.value = shipName;
        option.textContent = shipName;
        shipSelect.appendChild(option);
    });
}

// When ship selection changes
shipSelect.addEventListener("change", () => {
    const selectedShip = shipSelect.value;
    if (!selectedShip) return;

    const variants = allData[selectedShip];
    shipDisplay.innerHTML = ""; // clear previous tiles

    Object.keys(variants).forEach(variantName => {
        const variantData = variants[variantName];

        // Create tile
        const tile = document.createElement("div");
        tile.className = "ship-tile";

        // Variant title
        const title = document.createElement("h3");
        title.textContent = variantName;
        tile.appendChild(title);

        // Create table for Apex levels
        const table = document.createElement("table");
        const headerRow = document.createElement("tr");
        ["Level", "HP", "Buffs"].forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Add rows for each level
        ["Base Model", "Apex 5", "Apex 10", "Apex 15", "Apex 20"].forEach(level => {
            const row = document.createElement("tr");

            const tdLevel = document.createElement("td");
            tdLevel.textContent = level;
            row.appendChild(tdLevel);

            const tdHP = document.createElement("td");
            tdHP.textContent = variantData[level].hp;
            row.appendChild(tdHP);

            const tdBuffs = document.createElement("td");
            tdBuffs.textContent = variantData[level].buffs;
            row.appendChild(tdBuffs);

            table.appendChild(row);
        });

        tile.appendChild(table);
        shipDisplay.appendChild(tile);
    });
});
