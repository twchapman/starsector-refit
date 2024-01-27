import * as React from 'react'
import { FC, useState } from 'react';
import styled from 'styled-components';
import { Ship } from '../Ship';
import { ShipBox } from './ship-box';

const ShipList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const NewLoadoutPlus = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    font-size: 70px;
    font-weight: bold;
    color: #184A55;
    text-shadow:
        -1px -1px 0 #fff,
        1px -1px 0 #fff,
        -1px 1px 0 #fff,
        1px 1px 0 #fff;
    user-select: none;
    width: 85px;
    height: 85px;
    padding: 5px;
    background: #000;

    &:hover {
    background: #184A55;
    }
`;

interface ShipSelectorProps {
    shipList: Ship[];
    onShipSelected: (ship: Ship) => void;
}
export const ShipSelector: FC<ShipSelectorProps> = ({ shipList, onShipSelected }) => {
    const [shiplistOpen, setShiplistOpen] = useState(false);
    const [showSpoilers, setShowSpoilers] = useState(false);

    const handleOpenShipList = () => {
        setShiplistOpen(true);
    }

    const handleShipSelected = (ship: Ship) => {
        onShipSelected(ship);
        setShiplistOpen(false);
    }

    return (
        <div>
            <input type="checkbox" id="showSpoilers" checked={showSpoilers} onClick={() => setShowSpoilers(!showSpoilers)} /><label htmlFor="showSpoilers">Show Spoilers</label>
            {shiplistOpen ?
                <ShipList>{shipList.filter(ship => showSpoilers ? ship : !ship.hints.includes("HIDE_IN_CODEX")).map((ship) => (
                    <div key={ship.hullId} onClick={() => handleShipSelected(ship)}>
                        <ShipBox key={ship.hullId} name={ship.hullName} spritePath={ship.spriteName} />
                    </div>))}
                </ShipList>
                : <div onClick={() => handleOpenShipList()}>
                    <NewLoadoutPlus>+</NewLoadoutPlus>
                </div>}
        </div>
    );
}