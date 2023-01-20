import * as React from 'react'
import { FC, useState } from 'react';
import styled from 'styled-components';
import { Ship } from '../Ship';
import { ShipBox } from './ship-box';

const WeaponBorder = styled.div`
    margin: auto;
    width: 32px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-position: 0 24px,center;
    background-size: 32px;
    background-repeat: no-repeat;
}

    &.ballistic {
        background-image: url(assets/Ballistic.svg);
    }
    &.energy {
        background-image: url(assets/Energy.svg);
    }
    &.missile {
        background-image: url(assets/Missile.svg);
    }
    &.synergy {
        background-image: url(assets/Synergy.svg);
    }
    &.universal {
        background-image: url(assets/Universal.svg);
    }
`;

interface ShipSelectorProps {
    shipList: Ship[];
}
export const ShipSelector: FC<ShipSelectorProps> = ({ shipList }) => {
    const [selectedShip, setSelectedShip] = useState(shipList[0]);
    return (
        <div>
            {shipList.map((ship) => (
                <ShipBox key={ship.hullId} name={ship.hullName} spritePath={ship.spriteName} />
            ))}
        </div>
    );
}