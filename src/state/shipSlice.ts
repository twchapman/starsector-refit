import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ship } from "../Ship";
import { Weapon } from "../Weapon";
import { WeaponSlot } from "../WeaponSlot";

export interface ShipState {
    selectedShip?: Ship;
}

const initialState: ShipState = {
    selectedShip: undefined
}

export const shipSlice = createSlice({
    name: 'ship',
    initialState,
    reducers: {
        selectShip: (state: ShipState, action: PayloadAction<Ship>) => {
            state.selectedShip = action.payload;
        },
        selectWeaponForShip: (state: ShipState, action: PayloadAction<{ slot: WeaponSlot, weapon?: Weapon }>) => {
            if (!state.selectedShip) return;
            state.selectedShip.weaponSlots.find(s => s.id === action.payload.slot.id)!.selectedWeapon = action.payload.weapon;
        }
    }
})

export const { selectShip, selectWeaponForShip } = shipSlice.actions;

export default shipSlice.reducer;