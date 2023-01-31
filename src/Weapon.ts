export type WeaponSize = "SMALL" | "MEDIUM" | "LARGE";
export type WeaponType = "BALLISTIC" | "ENERGY" | "MISSILE" | "UNIVERSAL" | "HYBRID" | "COMPOSITE" | "SYNERGY" | "DECORATIVE" | "SYSTEM";

export const getWeaponTypes = (type: WeaponType): WeaponType[] => {
    switch (type) {
        case "BALLISTIC":
            return ["BALLISTIC"];
        case "ENERGY":
            return ["ENERGY"];
        case "MISSILE":
            return ["MISSILE"];
        case "UNIVERSAL":
            return ["BALLISTIC", "ENERGY", "MISSILE"];
        case "HYBRID":
            return ["BALLISTIC", "ENERGY"];
        case "COMPOSITE":
            return ["BALLISTIC", "MISSILE"];
        case "SYNERGY":
            return ["ENERGY", "MISSILE"];
        default:
            return [];
    }
}

export interface Weapon {
    hardpointSprite: string;
    id: string;
    name: string;
    size: WeaponSize;
    type: WeaponType;
    range: number;
    OPs: number;
}

