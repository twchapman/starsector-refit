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
}
export const ShipSelector: FC<ShipSelectorProps> = ({ shipList }) => {
    const [selectedShip, setSelectedShip] = useState(shipList[0]);
    const [shiplistOpen, setShiplistOpen] = useState(false);

    const handleOpenShipList = () => {
        setShiplistOpen(true);
    }

    const handleShipSelected = (ship: Ship) => {
        setSelectedShip(ship);
        setShiplistOpen(false);
    }

    return (
        <div>
            {shiplistOpen ?
                <ShipList>{shipList.map((ship) => (
                    <div onClick={() => handleShipSelected(ship)}>
                        <ShipBox key={ship.hullId} name={ship.hullName} spritePath={ship.spriteName} />
                    </div>))}
                </ShipList>
                : <div onClick={() => handleOpenShipList()}>
                    <ShipBox name={selectedShip.hullName} spritePath={selectedShip.spriteName} />
                </div>}
        </div>
    );
}