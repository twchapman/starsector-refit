import * as React from 'react'
import ReactDOM from 'react-dom/client';
import { WeaponFilter } from './components/weapon-filter';
import { WeaponSelector } from './components/weapon-selector';

// temporary
import weapons from '../data/weapons.json';

const App = () => (<div>
    <h1>foo bar baz</h1>
    <WeaponSelector weaponList={weapons} />
</div>)

const root = ReactDOM.createRoot(
    document.getElementById('root')!
);
root.render(<App />);