import * as React from 'react'
import { FC, useState } from 'react';
import styled from 'styled-components';
import { Ship } from '../Ship';
import { ShipBox } from './ship-box';

const ShipList = styled.div`
    display: flex;
    flext-direction: row;
    flex-wrap: wrap;
`;

interface ShipSelectorProps {
    shipList: Ship[];
    onShipSelected: (ship: Ship) => void;
}
export const ShipSelector: FC<ShipSelectorProps> = ({ shipList, onShipSelected }) => {
    const [selectedShip, setSelectedShip] = useState(shipList[0]);
    const [shiplistOpen, setShiplistOpen] = useState(false);
    const [showSpoilers, setShowSpoilers] = useState(false);

    const handleOpenShipList = () => {
        setShiplistOpen(true);
    }

    const handleShipSelected = (ship: Ship) => {
        setSelectedShip(ship);
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
                    <ShipBox name={selectedShip.hullName} spritePath={selectedShip.spriteName} />
                </div>}
        </div>
    );
}