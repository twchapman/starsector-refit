import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ship } from "../Ship";

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
    }
})

export const { selectShip } = shipSlice.actions;

export default shipSlice.reducer;