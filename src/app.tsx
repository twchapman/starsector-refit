import * as React from 'react'
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { ShipSelector } from './components/ship-selector';
import { WeaponSelector } from './components/weapon-selector';

// temporary
import shipJson from '../data/ships.json';
import { Ship } from './Ship';

import weaponJson from '../data/weapons.json';
import { Weapon } from './Weapon';
import { ShipRefitter } from './components/ship-refitter';

const ShipRefitterSection = styled.div`
    display: flex;
`;

const App = () => {
    const [selectedShip, setSelectedShip] = React.useState((shipJson as unknown as Ship[])[shipJson.length - 1]);

    const ships = shipJson as unknown as Ship[];
    const weapons = weaponJson as unknown as Weapon[];

    return (<div>
        <ShipSelector shipList={ships} onShipSelected={(ship) => setSelectedShip(ship)} />
        <ShipRefitterSection>
            <ShipRefitter ship={selectedShip} />
            <WeaponSelector weaponList={weapons} />
        </ShipRefitterSection>
    </div>)
};

const root = ReactDOM.createRoot(
    document.getElementById('root')!
);
root.render(<App />);