import { Ship as RawShip, HullSize } from "../Ship";
import { Weapon, getWeaponTypes } from "../Weapon";
import { WeaponSlot } from "../WeaponSlot";

// Snapshot removed per request. Components may read `weaponSlots` or use the getters directly.

export class ShipModel {
    hullId: string;
    hullName: string;
    hullSize: HullSize;
    spriteName: string;
    armor: number;
    fighterBays: number;
    fluxCapacity: number;
    fluxDissipation: number;
    hull: number;
    OPs: number;
    topSpeed: number;
    shieldArc: number;
    shieldUpkeep: number;
    shieldEfficiency: number;
    hints: string[];

    // weaponSlots is the mutable state the app will exercise
    public weaponSlots: WeaponSlot[];

    constructor(raw: RawShip) {
        this.hullId = raw.hullId;
        this.hullName = raw.hullName;
        this.hullSize = raw.hullSize;
        this.spriteName = raw.spriteName;
        this.armor = raw.armor;
        this.fighterBays = raw.fighterBays;
        this.fluxCapacity = raw.fluxCapacity;
        this.fluxDissipation = raw.fluxDissipation;
        this.hull = raw.hull;
        this.OPs = raw.OPs;
        this.topSpeed = raw.topSpeed;
        this.shieldArc = raw.shieldArc;
        this.shieldUpkeep = raw.shieldUpkeep;
        this.shieldEfficiency = raw.shieldEfficiency;
        this.hints = raw.hints || [];

        // make a shallow clone of weapon slots so model controls mutations
        this.weaponSlots = (raw.weaponSlots || []).map(ws => ({ ...ws }));
    }

    // Snapshot method removed - components should read from `weaponSlots` or use getSlot

    // Find a slot by id
    public getSlot(slotId: string): WeaponSlot | undefined {
        return this.weaponSlots.find(s => s.id === slotId);
    }

    // Attach a weapon to a slot (validates size/type compatibility)
    public attachWeapon(slotId: string, weapon: Weapon): boolean {
        const slot = this.getSlot(slotId);
        if (!slot) return false;

        if (!this.canFitWeaponIntoSlot(weapon, slot)) return false;

        slot.selectedWeapon = { ...weapon };
        return true;
    }

    // Detach weapon from a slot, returning the removed weapon or undefined
    public detachWeapon(slotId: string): Weapon | undefined {
        const slot = this.getSlot(slotId);
        if (!slot) return undefined;
        const w = slot.selectedWeapon;
        slot.selectedWeapon = undefined;
        return w;
    }

    // NOTE: swapWeapons and replaceWeapon were removed to simplify the model per request.

    // Validation helper
    public canFitWeaponIntoSlot(weapon: Weapon, slot: WeaponSlot): boolean {
        if (!weapon || !slot) return false;

        // Size compatibility: follow the same logic as filterBySize in weapon-selector.tsx
        // If slot size is nullish or LARGE -> allow
        if (!slot.size || slot.size === "LARGE") {
            // continue to type check
        } else if (slot.size === "MEDIUM") {
            if (!(weapon.size === "MEDIUM" || weapon.size === "SMALL")) return false;
        } else if (slot.size === "SMALL") {
            if (weapon.size !== "SMALL") return false;
        }

    // Type compatibility: weapon.type must be one of the allowed types for the slot
    const allowed = getWeaponTypes(slot.type);
    if (!allowed.includes(weapon.type)) return false;

    return true;
    }

}

export default ShipModel;
