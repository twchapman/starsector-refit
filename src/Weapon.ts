export type WeaponSize = "SMALL" | "MEDIUM" | "LARGE";
export type WeaponType = "BALLISTIC" | "ENERGY" | "MISSILE" | "DECORATIVE";

export interface Weapon {
    hardpointSprite: string;
    id: string;
    name: string;
    size: WeaponSize;
    type: WeaponType;
    range: number;
    OPs: number;
}