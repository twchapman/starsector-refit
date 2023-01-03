const fs = require('fs');
const path = require('path');

const [, , dataDirPath] = process.argv;

try {
    fs.mkdirSync("data");
} catch { }

const shipOutput = path.join("data", "ships.json");
if (fs.existsSync(shipOutput)) fs.unlinkSync(shipOutput);

console.log("| mining ship data...");
const shipFields = ["center", "height", "hullId", "hullName", "hullSize", "spriteName", "weaponSlots"];
const shipFilters = ["derelict", "drone", "module", "remnant", "station"];
const shipList = fs.readdirSync(path.join(dataDirPath, "hulls"));
const ships = shipList.map(shipFile => {
    if (!shipFile.endsWith(".ship")) return;
    for (let filter of shipFilters) {
        if (shipFile.startsWith(filter)) return;
    }
    const shipData = JSON.parse(fs.readFileSync(path.join(dataDirPath, "hulls", shipFile), { encoding: "utf-8" }));
    const ship = {};
    shipFields.forEach(field => ship[field] = shipData[field]);
    if (ship.hullSize === "FIGHTER") return;
    return ship;
}).filter(s => s);
console.log(`|> wrote ${ships.length} ships.`);

fs.writeFileSync(shipOutput, JSON.stringify(ships));

console.log('finished.')