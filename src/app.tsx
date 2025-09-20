import * as React from 'react'
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { useStore } from './state/useStore'
import type { AppState } from './state/useStore';
import { ShipSelector } from './components/ship-selector';
import { WeaponSelector } from './components/weapon-selector';

// temporary
import shipJson from '../data/ships.json';
import { Ship } from './Ship';

import weaponJson from '../data/weapons.json';
import { Weapon, getWeaponTypes } from './Weapon';
import { ShipRefitter } from './components/ship-refitter';
// actions removed - using zustand store instead
import { ShipLoadout } from './components/ship-loadout';

const ShipRefitterSection = styled.div`
    display: flex;
`;

const ships = shipJson as unknown as Ship[];
const weapons = weaponJson as unknown as Weapon[];
weapons.forEach((weapon) => {
    weapon.OPs = parseInt(weapon.OPs as unknown as string);
});

const App = () => {
    const setSelectedShip = useStore((s: AppState) => s.setSelectedShip);
    const setSelectedSlot = useStore((s: AppState) => s.setSelectedSlot);
    const selectedShip = useStore((s: AppState) => s.selectedShip);
    const selectedWeaponSlot = useStore((s: AppState) => s.selectedSlot);
    const shipModel = useStore((s: AppState) => s.shipModel);

    return (<div>
        <ShipSelector shipList={ships} onShipSelected={(ship) => setSelectedShip(ship)} />
        <ShipRefitterSection>
            {selectedShip && <ShipRefitter ship={selectedShip} onSlotSelected={(slot) => setSelectedSlot(slot)} />}
            {selectedWeaponSlot ? <WeaponSelector weaponList={weapons} weaponSlot={selectedWeaponSlot} /> : <WeaponSelector weaponList={weapons} />}
        </ShipRefitterSection>
        <ShipLoadout />
    </div>)
};

const root = ReactDOM.createRoot(
    document.getElementById('root')!
);
root.render(<App />);