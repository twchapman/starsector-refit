import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    }
})

export const { selectWeaponSlot } = weaponSlotSlice.actions;

export default weaponSlotSlice.reducer;