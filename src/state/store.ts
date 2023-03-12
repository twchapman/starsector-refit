import { configureStore } from "@reduxjs/toolkit";
import shipReducer from "./shipSlice";
import weaponSlotReducer from "./weaponSlotSlice";

export const store = configureStore({
    reducer: {
        ship: shipReducer,
        weaponSlots: weaponSlotReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch