import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Weapon } from "../Weapon";
import { WeaponSlot } from "../WeaponSlot";


export interface WeaponSlotState {
    selectedSlot?: WeaponSlot;
}

const initialState: WeaponSlotState = {
    selectedSlot: undefined
}

export const weaponSlotSlice = createSlice({
    name: 'ship',
    initialState,
    reducers: {
        selectWeaponSlot: (state: WeaponSlotState, action: PayloadAction<WeaponSlot>) => {
            state.selectedSlot = action.payload;
        },
        selectWeaponForSlot: (state: WeaponSlotState, action: PayloadAction<Weapon>) => {
            if (!state.selectedSlot) return;
            state.selectedSlot.selectedWeapon = action.payload;
        }
    }
})

export const { selectWeaponSlot, selectWeaponForSlot } = weaponSlotSlice.actions;

export default weaponSlotSlice.reducer;