import * as React from 'react'
import { FC, useState } from 'react';
import styled from 'styled-components';
import { Ship } from '../Ship';
import ShipModel from '../model/ShipModel';
import { useStore } from '../state/useStore';
import { WeaponType } from '../Weapon';
import { WeaponSlot } from '../WeaponSlot';
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
    transform: translate(-50%, -50%);

    &:before {
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-size: 32px;
        background-repeat: no-repeat;
        opacity: .3;
        transition: all .2s;
    }

    &.ballistic:before {
        background-image: url(assets/Ballistic.svg);
    }
    &.energy:before {
        background-image: url(assets/Energy.svg);
    }
    &.missile:before {
        background-image: url(assets/Missile.svg);
    }
    &.synergy:before {
        background-image: url(assets/Synergy.svg);
    }
    &.composite:before {
        background-image: url(assets/Composite.svg);
    }
    &.hybrid:before {
        background-image: url(assets/Hybrid.svg);
    }
    &.universal:before {
        background-image: url(assets/Universal.svg);
    }

    &:hover:before, &.active:before {
        opacity: 1;
    }
`;

interface ShipRefitterProps {
    ship: Ship;
    onSlotSelected: (slot: WeaponSlot) => void;
}
export const ShipRefitter: FC<ShipRefitterProps> = ({ ship, onSlotSelected }) => {
    const modelFromStore = useStore(s => s.shipModel);
    const model = modelFromStore ?? new ShipModel(ship);
    return (
        <ShipContainer>
            <Sprite src={ship.spriteName} scaleFactor={1.5} />
            <WeaponSlotDisplays>
                {model.weaponSlots.filter(slot => slot.type !== 'DECORATIVE' && slot.type !== 'SYSTEM').map((slot) => (
                    <WeaponSlotDisplay key={slot.id} type={slot.type} x={slot.locations[1] * -1.5 + ship.center[0] * 1} y={slot.locations[0] * -1.5 + (ship.height - ship.center[1] * 1)} className={slot.type} onClick={() => onSlotSelected(slot)}>
                        {slot.selectedWeapon && <img src={slot.selectedWeapon.hardpointSprite} />}
                    </WeaponSlotDisplay>
                ))}
            </WeaponSlotDisplays>
        </ShipContainer>
    )
}