import ShipModel from './ShipModel';
import { Ship } from '../Ship';
import { Weapon } from '../Weapon';

const ship: Ship = {
    center: [0,0],
    height: 1,
    hullId: 'h1',
    hullName: 'H',
    hullSize: 'CRUISER',
    spriteName: 's.png',
    weaponSlots: [
        { id: 's1', locations: [0,0], mount: 'HARDPOINT', size: 'SMALL', type: 'BALLISTIC' },
        { id: 's2', locations: [1,0], mount: 'HARDPOINT', size: 'MEDIUM', type: 'UNIVERSAL' },
        { id: 's3', locations: [2,0], mount: 'HARDPOINT', size: 'LARGE', type: 'ENERGY' }
    ],
    armor: 0,
    fighterBays: 0,
    fluxCapacity: 0,
    fluxDissipation: 0,
    hull: 100,
    OPs: 10,
    topSpeed: 1,
    shieldArc: 90,
    shieldUpkeep: 0,
    shieldEfficiency: 0,
    hints: []
};

const wSmallBallistic: Weapon = { hardpointSprite: '', id: 'w1', name: 's', size: 'SMALL', type: 'BALLISTIC', range: 10, OPs: 1 };
const wMediumEnergy: Weapon = { hardpointSprite: '', id: 'w2', name: 'm', size: 'MEDIUM', type: 'ENERGY', range: 20, OPs: 2 };
const wLargeEnergy: Weapon = { hardpointSprite: '', id: 'w3', name: 'l', size: 'LARGE', type: 'ENERGY', range: 30, OPs: 3 };

const model = new ShipModel(ship);

console.log('canFit s1 small ballistic (expect true):', model.canFitWeaponIntoSlot(wSmallBallistic, model.getSlot('s1')!));
console.log('attach s1 small ballistic (expect true):', model.attachWeapon('s1', wSmallBallistic));
console.log('attach s2 medium energy (expect true because UNIVERSAL):', model.attachWeapon('s2', wMediumEnergy));
console.log('attach s3 large energy (expect true):', model.attachWeapon('s3', wLargeEnergy));

// Negative cases
console.log('canFit s1 medium energy (expect false):', model.canFitWeaponIntoSlot(wMediumEnergy, model.getSlot('s1')!));
console.log('attach s1 medium energy (expect false):', model.attachWeapon('s1', wMediumEnergy));

console.log('Final slots:', model.weaponSlots);

export {};
