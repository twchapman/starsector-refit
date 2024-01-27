const fs = require('fs');
const path = require('path');
const csvParse = require('csv-parse/sync');

const [, , gameCorePath] = process.argv;

if (gameCorePath === null || gameCorePath === undefined || gameCorePath.length < 1) {
    console.error('Error: missing game data path. Usage: npm run datamine path/to/Fractal Softworks/Starsector/starsector-core');
    process.exit(1);
}

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
const shipCsv = fs.readFileSync(path.join(dataDirPath, "hulls", "ship_data.csv"), { encoding: "utf-8" });
const shipCsvData = csvParse.parse(shipCsv, {
    columns: true,
    skip_empty_lines: true
});
const shipFields = ["center", "height", "hullId", "hullName", "hullSize", "spriteName", "weaponSlots"];
const shipFilters = ["derelict_", "drone_", "module_", "platform", "remnant_", "station"];
const shipCsvFieldKeys = [
    ["armor", "armor rating"],
    ["fighterBays", "fighter bays"],
    ["fluxCapacity", "max flux"],
    ["fluxDissipation", "flux dissipation"],
    ["hull", "hitpoints"],
    ["OPs", "ordnance points"],
    ["topSpeed", "max speed"],
    ["shieldArc", "shield arc"],
    ["shieldUpkeep", "shield upkeep"],
    ["shieldEfficiency", "shield efficiency"]
];
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
    const thisShipCsvData = shipCsvData.filter(s => s.id === shipData.hullId)[0];
    if (!thisShipCsvData) return;
    if (ship.hullSize === "FIGHTER") return;
    for (let filter of shipCsvFieldKeys) {
        ship[filter[0]] = thisShipCsvData[filter[1]];
    }
    ship.hints = thisShipCsvData.hints.split(', ');
    // if (ship.hints.includes("HIDE_IN_CODEX")) console.log(ship.hullName);
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
const weaponCsvData = csvParse.parse(weaponCsv, {
    columns: true,
    skip_empty_lines: true
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
    let weaponData;
    try {
        weaponData = JSON.parse(weaponJson);
    } catch (e) {
        console.warn(`Failed to parse ${weaponFile}, skipping.`);
        return;
    }
    const weapon = {};
    weaponFields.forEach(field => weapon[field] = weaponData[field]);
    const thisWeaponCsvData = weaponCsvData.filter(w => w.id === weaponData.id)[0];
    weapon.name = thisWeaponCsvData.name;
    weapon.OPs = thisWeaponCsvData.OPs;
    weapon.range = thisWeaponCsvData.range;
    const hardpointBaseSprite = weapon["hardpointSprite"];
    const hardpointGunSprite = weapon["hardpointGunSprite"];
    try {
        if (hardpointBaseSprite) {
            weapon["hardpointSprite"] = weapon["hardpointSprite"].replace(/(graphics\/weapons\/)(?:.*\/)?(.+\.png)/, "$1$2");
            fs.copyFileSync(path.join(gameCorePath, hardpointBaseSprite), path.join(__dirname, weapon["hardpointSprite"]));
        }
        if (hardpointGunSprite) {
            weapon["hardpointGunSprite"] = weapon["hardpointGunSprite"].replace(/(graphics\/weapons\/)(?:.*\/)?(.+\.png)/, "$1$2");
            fs.copyFileSync(path.join(gameCorePath, hardpointGunSprite), path.join(__dirname, weapon["hardpointGunSprite"]));
        }
    } catch (e) {
        console.warn(`Couldn't find sprite ${hardpointBaseSprite} or ${hardpointGunSprite}: `);
    }
    return weapon;
}).filter(w => w);

console.log(`|> wrote ${weapons.length} weapons.`);

fs.writeFileSync(weaponOutput, JSON.stringify(weapons));

console.log('finished.')