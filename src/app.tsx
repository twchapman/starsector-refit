import * as React from 'react'
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { ShipSelector } from './components/ship-selector';
import { WeaponSelector } from './components/weapon-selector';

// temporary
import shipJson from '../data/ships.json';
import { Ship } from './Ship';

import weaponJson from '../data/weapons.json';
import { Weapon, getWeaponTypes } from './Weapon';
import { ShipRefitter } from './components/ship-refitter';
import { WeaponSlot } from './WeaponSlot';

const ShipRefitterSection = styled.div`
    display: flex;
`;

const App = () => {
    const [selectedShip, setSelectedShip] = React.useState((shipJson as unknown as Ship[])[shipJson.length - 1]);
    const [selectedSlot, setSelectedSlot] = React.useState<WeaponSlot | null>(null);

    const ships = shipJson as unknown as Ship[];
    const weapons = weaponJson as unknown as Weapon[];

    return (<div>
        <ShipSelector shipList={ships} onShipSelected={(ship) => setSelectedShip(ship)} />
        <ShipRefitterSection>
            <ShipRefitter ship={selectedShip} onSlotSelected={setSelectedSlot} />
            {selectedSlot ? <WeaponSelector weaponList={weapons} weaponFilterMaxSize={selectedSlot.size} weaponFilterTypes={getWeaponTypes(selectedSlot.type)} /> : <WeaponSelector weaponList={weapons} />}
        </ShipRefitterSection>
    </div>)
};

const root = ReactDOM.createRoot(
    document.getElementById('root')!
);
root.render(<App />);