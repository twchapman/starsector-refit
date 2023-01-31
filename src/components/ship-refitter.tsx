import * as React from 'react'
import { FC, useState } from 'react';
import styled from 'styled-components';
import { Ship } from '../Ship';
import { WeaponType } from '../Weapon';
import { WeaponHardpoint } from './weapon-hardpoint';

const ShipContainer = styled.div`
    flex-grow: 1;
    position: relative;
    height: 600px;
    border: 1px solid black;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: 1fr auto 1fr;
`;

const Sprite = styled.img<{ scaleFactor: number }>`
    transform: scale(${props => props.scaleFactor});
    grid-row: 2;
    grid-column: 2;
`;

const WeaponSlotDisplays = styled.div`
    position: relative;
    grid-row: 2;
    grid-column: 2;
`;

const WeaponSlotDisplay = styled.div<{ type: WeaponType; x: number; y: number }>`
    position: absolute;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: 32px;
    background-repeat: no-repeat;
    transform: translate(-50%, -50%);

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
    &.composite {
        background-image: url(assets/Composite.svg);
    }
    &.hybrid {
        background-image: url(assets/Hybrid.svg);
    }
    &.universal {
        background-image: url(assets/Universal.svg);
    }

    &:hover, &.active {
        border: 2px solid #fff;
    }
`;

interface ShipRefitterProps {
    ship: Ship;
}
export const ShipRefitter: FC<ShipRefitterProps> = ({ ship }) => {
    return (
        <ShipContainer>
            <Sprite src={ship.spriteName} scaleFactor={1.5} />
            <WeaponSlotDisplays>
                {ship.weaponSlots.filter(slot => slot.type !== 'DECORATIVE' && slot.type !== 'SYSTEM').map((slot) => (
                    <WeaponSlotDisplay key={slot.id} type={slot.type} x={slot.locations[1] * -1.5 + ship.center[0] * 1} y={slot.locations[0] * -1.5 + (ship.height - ship.center[1] * 1)} className={slot.type} />
                ))}
            </WeaponSlotDisplays>
        </ShipContainer>
    )
}