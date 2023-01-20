import * as React from 'react'
import { FC, useState } from 'react';
import styled from 'styled-components';
import { Ship } from '../Ship';
import { WeaponType } from '../Weapon';
import { WeaponHardpoint } from './weapon-hardpoint';

const ShipContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 600px;
    border: 1px solid black;
`;

const Sprite = styled.img<{ scaleFactor: number }>`
    transform: scale(${props => props.scaleFactor});
`;

const WeaponSlotDisplays = styled.div`
    margin: 0 auto;
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

interface ShipRefitterProps {
    ship: Ship;
}
export const ShipRefitter: FC<ShipRefitterProps> = ({ ship }) => {
    return (
        <ShipContainer>
            <WeaponSlotDisplays>
                <Sprite src={ship.spriteName} scaleFactor={1.5} />
                {ship.weaponSlots.map((slot) => (
                    <WeaponSlotDisplay key={slot.id} type={slot.type} x={slot.locations[1] * 1.5} y={slot.locations[0] * 1.5} />
                ))}
            </WeaponSlotDisplays>
        </ShipContainer>
    )
}