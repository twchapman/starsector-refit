const fs = require('fs');
const path = require('path');

const [, , gameCorePath] = process.argv;

console.log("starting datamining.")

const dataDirPath = path.join(gameCorePath, "data");

const tryMakeDir = (path) => {
    try {
        fs.mkdirSync(path);
    } catch { }
}
tryMakeDir("data");
tryMakeDir("graphics");
tryMakeDir(path.join("graphics", "ships"));
tryMakeDir(path.join("graphics", "weapons"));

// Utility
const cleanedJson = (jsonString) => jsonString.replace(/(#.*)/gm, "").replace(/(.+)(,)(\s*})$/gm, "$1$3").replace(/("renderHints":.+)/gm, "").replace(/("textureType":.+)/gm, "").replace(/("pierceSet":.+)/gm, "").replace(/(.+;)/gm, "");

// Ships
const shipOutput = path.join("data", "ships.json");
if (fs.existsSync(shipOutput)) fs.unlinkSync(shipOutput);

console.log("| mining ship data...");
const shipCsv = fs.readFileSync(path.join(dataDirPath, "weapons", "weapon_data.csv"), { encoding: "utf-8" });
const shipCsvLines = shipCsv.split('\r\n');
const shipCsvFields = shipCsvLines[0].split(',');
const shipCsvData = shipCsvLines.slice(1).map(line => {
    const shipData = {};
    const values = line.split(',');
    for (let f = 0; f < shipCsvFields.length; f++) {
        shipData[shipCsvFields[f]] = values[f];
    }
    return shipData;
});
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
    const thisShipCsvData = shipCsvData.filter(s => s.id === shipData.id)[0];
    if (ship.hullSize === "FIGHTER") return;
    const actualShipSprite = ship["spriteName"];
    ship["spriteName"] = ship["spriteName"].replace(/(graphics\/ships\/).+\/(.+\.png)/, "$1$2");
    fs.copyFileSync(path.join(gameCorePath, actualShipSprite), path.join(__dirname, ship["spriteName"]));
    return ship;
}).filter(s => s);
console.log(`|> wrote ${ships.length} ships.`);

fs.writeFileSync(shipOutput, JSON.stringify(ships));

// Weapons
const weaponOutput = path.join("data", "weapons.json");
if (fs.existsSync(weaponOutput)) fs.unlinkSync(weaponOutput);

console.log("| mining weapon data...");
const weaponCsv = fs.readFileSync(path.join(dataDirPath, "weapons", "weapon_data.csv"), { encoding: "utf-8" });
const weaponCsvLines = weaponCsv.split('\r\n');
const weaponCsvFields = weaponCsvLines[0].split(',');
const weaponCsvData = weaponCsvLines.slice(1).map(line => {
    const weaponData = {};
    const values = line.split(',');
    for (let f = 0; f < weaponCsvFields.length; f++) {
        weaponData[weaponCsvFields[f]] = values[f];
    }
    return weaponData;
});
const weaponFields = ["hardpointSprite", "id", "size", "type"];
const weaponFilters = ["blinker", "cryo", "interdictor", "lights", "rift", "tpc"];
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
    const thisWeaponCsvData = weaponCsvData.filter(w => w.id === weaponData.id)[0];
    weapon.name = thisWeaponCsvData.name;
    weapon.OPs = thisWeaponCsvData.OPs;
    weapon.range = thisWeaponCsvData.range;
    const actualWeaponSprite = weapon["hardpointSprite"];
    weapon["hardpointSprite"] = weapon["hardpointSprite"].replace(/(graphics\/weapons\/)(?:.*\/)?(.+\.png)/, "$1$2");
    fs.copyFileSync(path.join(gameCorePath, actualWeaponSprite), path.join(__dirname, weapon["hardpointSprite"]));
    return weapon;
}).filter(w => w);

console.log(`|> wrote ${weapons.length} weapons.`);

fs.writeFileSync(weaponOutput, JSON.stringify(weapons));

// End
console.log('finished.')