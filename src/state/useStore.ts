import create from 'zustand';
import { Ship } from '../Ship';
import { WeaponSlot } from '../WeaponSlot';
import { Weapon } from '../Weapon';
import ShipModel from '../model/ShipModel';

export interface AppState {
    selectedShip: Ship | null;
    shipModel?: ShipModel | null;
    selectedSlot: WeaponSlot | null;
    setSelectedShip: (ship: Ship | null) => void;
    setSelectedSlot: (slot: WeaponSlot | null) => void;
    selectWeaponForSlot: (weapon: Weapon | null) => void;
    selectWeaponForShip: (slot: WeaponSlot, weapon?: Weapon | null) => void;
}

export const useStore = create<AppState>((set: any, get: any) => ({
    selectedShip: null,
    shipModel: null,
    selectedSlot: null,
    setSelectedShip: (ship: Ship | null) => {
        if (!ship) return set({ selectedShip: null, shipModel: null });
        const model = new ShipModel(ship);
        set({ selectedShip: ship, shipModel: model });
    },
    setSelectedSlot: (slot: WeaponSlot | null) => set({ selectedSlot: slot }),
    selectWeaponForSlot: (weapon: Weapon | null) => {
        const model: ShipModel | undefined = get().shipModel;
        const slot: WeaponSlot | undefined = get().selectedSlot;
        if (!slot || !model) return;
        if (weapon === null) {
            model.detachWeapon(slot.id);
        } else {
            model.attachWeapon(slot.id, weapon);
        }
        // update ship reference to keep consumers in sync
        set({ shipModel: model, selectedShip: { ...get().selectedShip!, weaponSlots: model.weaponSlots } });
    },
    selectWeaponForShip: (slot: WeaponSlot, weapon?: Weapon | null) => {
        const model: ShipModel | undefined = get().shipModel;
        if (!model) return;
        if (weapon === null || weapon === undefined) {
            model.detachWeapon(slot.id);
        } else {
            model.attachWeapon(slot.id, weapon);
        }
        set({ shipModel: model, selectedShip: { ...get().selectedShip!, weaponSlots: model.weaponSlots } });
    }
}));

// Export helpers for non-hook usage (adapters)
export const storeApi = {
    getState: () => (useStore as any).getState(),
    setSelectedShip: (ship: Ship | null) => (useStore as any).getState().setSelectedShip(ship),
    setSelectedSlot: (slot: WeaponSlot | null) => (useStore as any).getState().setSelectedSlot(slot),
    selectWeaponForShip: (slot: WeaponSlot, weapon?: Weapon | null) => (useStore as any).getState().selectWeaponForShip(slot, weapon),
    selectWeaponForSlot: (weapon: Weapon | null) => (useStore as any).getState().selectWeaponForSlot(weapon),
};

export default useStore;
