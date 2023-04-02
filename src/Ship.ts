import { WeaponSlot } from "./WeaponSlot";

export type HullSize = "FRIGATE" | "CRUISER" | "CAPITAL_SHIP" | "DESTROYER";

export interface Ship {
    center: [number, number];
    height: number;
    hullId: string;
    hullName: string;
    hullSize: HullSize
    spriteName: string;
    weaponSlots: WeaponSlot[];
    armor: number;
    fighterBays: number;
    fluxCapacity: number;
    fluxDissipation: number;
    hull: number;
    OPs: number;
    topSpeed: number;
    shieldArc: 90;
    shieldUpkeep: number;
    shieldEfficiency: number;
    hints: string[];
}