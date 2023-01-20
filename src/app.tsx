import * as React from 'react'
import ReactDOM from 'react-dom/client';
import { ShipSelector } from './components/ship-selector';
import { WeaponSelector } from './components/weapon-selector';

// temporary
import ships from '../data/ships.json';
import { Ship } from './Ship';

import weapons from '../data/weapons.json';
import { Weapon } from './Weapon';

const App = () => (<div>
    <ShipSelector shipList={ships as unknown as Ship[]} />
    <WeaponSelector weaponList={weapons as unknown as Weapon[]} />
</div>)

const root = ReactDOM.createRoot(
    document.getElementById('root')!
);
root.render(<App />);