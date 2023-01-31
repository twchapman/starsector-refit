import * as React from 'react'
import { FC, useState } from 'react';
import styled from 'styled-components';
import { WeaponSize, WeaponType } from '../Weapon';

export type WeaponFilterType = "ALL" | WeaponType;
export type WeaponFilterSize = "ALL" | WeaponSize;

const WeaponFilterContainer = styled.div`
    width: 510px;
`;

const WeaponFilterButton = styled.button<{ buttonColor: string }>`
    width: 170px;
    border: 1px solid ${props => props.buttonColor};
    background: ${props => props.buttonColor};
    color: #D8C24C;
    font-size: 18px;
    padding: 9px;

    &.deselected {
        filter: brightness(0.35);
    }
`;

interface WeaponFilterProps {
    onFilterChanged: (filterType: WeaponFilterType) => void;
}
export const WeaponFilter: FC<WeaponFilterProps> = ({ onFilterChanged }) => {
    const [filterType, setFiltertype] = useState<WeaponFilterType>("ALL");

    const changeFilter = (type: WeaponFilterType) => {
        if (filterType === type) {
            setFiltertype("ALL");
            onFilterChanged("ALL");
        } else {
            setFiltertype(type);
            onFilterChanged(type);
        }
    }

    return <WeaponFilterContainer>
        <WeaponFilterButton buttonColor="#463B00" className={filterType !== "ALL" && filterType !== "BALLISTIC" ? "deselected" : ""} onClick={() => changeFilter("BALLISTIC")}>BALLISTIC</WeaponFilterButton>
        <WeaponFilterButton buttonColor="#143847" className={filterType !== "ALL" && filterType !== "ENERGY" ? "deselected" : ""} onClick={() => changeFilter("ENERGY")}>ENERGY</WeaponFilterButton>
        <WeaponFilterButton buttonColor="#2B4600" className={filterType !== "ALL" && filterType !== "MISSILE" ? "deselected" : ""} onClick={() => changeFilter("MISSILE")}>MISSILE</WeaponFilterButton>
    </WeaponFilterContainer>
};