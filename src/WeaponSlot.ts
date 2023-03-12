import { Weapon, WeaponSize, WeaponType } from "./Weapon";

export type MountType = "HIDDEN" | "HARDPOINT" | "TURRET";

export interface WeaponSlot {
    id: string;
    locations: [number, number];
    mount: MountType;
    size: WeaponSize;
    type: WeaponType;
    selectedWeapon?: Weapon;
}
