import * as React from 'react'
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { RootState, store } from './state/store'
import { ShipSelector } from './components/ship-selector';
import { WeaponSelector } from './components/weapon-selector';

// temporary
import shipJson from '../data/ships.json';
import { Ship } from './Ship';

import weaponJson from '../data/weapons.json';
import { Weapon, getWeaponTypes } from './Weapon';
import { ShipRefitter } from './components/ship-refitter';
import { WeaponSlot } from './WeaponSlot';
import { selectShip } from './state/shipSlice';

const ShipRefitterSection = styled.div`
    display: flex;
`;

const App = () => {
    const dispatch = useDispatch();
    const selectedShip = useSelector((state: RootState) => state.ship.selectedShip);
    const [selectedSlot, setSelectedSlot] = React.useState<WeaponSlot | null>(null);

    const ships = shipJson as unknown as Ship[];
    const weapons = weaponJson as unknown as Weapon[];

    return (<div>
        <ShipSelector shipList={ships} onShipSelected={(ship) => dispatch(selectShip(ship))} />
        <ShipRefitterSection>
            {selectedShip && <ShipRefitter ship={selectedShip} onSlotSelected={setSelectedSlot} />}
            {selectedSlot ? <WeaponSelector weaponList={weapons} weaponSlot={selectedSlot} /> : <WeaponSelector weaponList={weapons} />}
        </ShipRefitterSection>
    </div>)
};

const root = ReactDOM.createRoot(
    document.getElementById('root')!
);
root.render(
    <Provider store={store}>
        <App />
    </Provider >
);