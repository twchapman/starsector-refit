import * as React from 'react'
import { FC, useState } from 'react';
import styled from 'styled-components';
import { Weapon, WeaponType } from '../Weapon';

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
    &.composite {
        background-image: url(assets/Composite.svg);
    }
    &.universal {
        background-image: url(assets/Universal.svg);
    }
`;

interface WeaponIconProps {
    sprite?: string;
    type: string;
}
export const WeaponHardpoint: FC<WeaponIconProps> = ({ sprite, type }) => {
    return (<WeaponBorder className={type.toLocaleLowerCase()}>
        {sprite && <img src={sprite} />}
    </WeaponBorder>);
}