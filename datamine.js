const fs = require('fs');
const path = require('path');

const [, , dataDirPath] = process.argv;

console.log("starting datamining.")

try {
    fs.mkdirSync("data");
} catch { }

// Utility
const cleanedJson = (jsonString) => jsonString.replace(/(#.*)/gm, "").replace(/(.+)(,)(\s*})$/gm, "$1$3").replace(/("renderHints":.+)/gm, "").replace(/("textureType":.+)/gm, "").replace(/("pierceSet":.+)/gm, "").replace(/(.+;)/gm, "");

// Ships
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
    const shipJson = cleanedJson(fs.readFileSync(path.join(dataDirPath, "hulls", shipFile), { encoding: "utf-8" }));
    const shipData = JSON.parse(shipJson);
    const ship = {};
    shipFields.forEach(field => ship[field] = shipData[field]);
    if (ship.hullSize === "FIGHTER") return;
    return ship;
}).filter(s => s);
console.log(`|> wrote ${ships.length} ships.`);

fs.writeFileSync(shipOutput, JSON.stringify(ships));

// Weapons
const weaponOutput = path.join("data", "weapons.json");
if (fs.existsSync(weaponOutput)) fs.unlinkSync(weaponOutput);

console.log("| mining weapon data...");
const weaponFields = ["hardpointSprite", "id", "size", "type"];
const weaponFilters = ["blinker", "rift", "tpc"];
const weaponList = fs.readdirSync(path.join(dataDirPath, "weapons"));
const weapons = weaponList.map(weaponFile => {
    if (!weaponFile.endsWith(".wpn")) return;
    for (let filter of weaponFilters) {
        if (weaponFile.startsWith(filter)) return;
    }
    const weaponJson = cleanedJson(fs.readFileSync(path.join(dataDirPath, "weapons", weaponFile), { encoding: "utf-8" }));
    const weaponData = JSON.parse(weaponJson);
    const weapon = {};
    weaponFields.forEach(field => weapon[field] = weaponData[field]);
    return weapon;
}).filter(w => w);
console.log(`|> wrote ${weapons.length} weapons.`);

fs.writeFileSync(weaponOutput, JSON.stringify(weapons));

// End
console.log('finished.')