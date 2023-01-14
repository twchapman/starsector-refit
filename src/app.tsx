import * as React from 'react'
import ReactDOM from 'react-dom/client';
import { WeaponSelector } from './components/weapon-selector';

// temporary
import weapons from '../data/weapons.json';
import { Weapon } from './Weapon';

const App = () => (<div>
    <h1>foo bar baz</h1>
    <WeaponSelector weaponList={weapons as unknown as Weapon[]} />
</div>)

const root = ReactDOM.createRoot(
    document.getElementById('root')!
);
root.render(<App />);