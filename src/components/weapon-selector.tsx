import * as React from 'react'
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectWeaponForShip } from '../state/shipSlice';
import { RootState } from '../state/store';
import { selectWeaponForSlot } from '../state/weaponSlotSlice';
import { getWeaponTypes, Weapon, WeaponSize, WeaponType } from '../Weapon';
import { WeaponSlot } from '../WeaponSlot';
import { WeaponFilter, WeaponFilterSize, WeaponFilterType } from './weapon-filter';
import { WeaponHardpoint } from './weapon-hardpoint';

const WeaponViewContainer = styled.div`
    display: grid;
    width: 510px;
    height: 68px;
    grid-template-columns: 104px 1fr 104px;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "icon name ."
                         "icon range ordinancepoints";
    background: #000000;
    color: #FFFFFF;

    &:hover {
        background: #184A55;
    }
`;

const WeaponViewIcon = styled.div`
    grid-area: icon;
`;

const WeaponViewName = styled.span`
    grid-area: name;
    line-height: 34px;
`;

const WeaponViewRange = styled.span`
    grid-area: range;
    color: #E6BD00;
    line-height: 34px;
`;

const WeaponViewOrdinancePoints = styled.span`
    grid-area: ordinancepoints;
    color: #E6BD00;
    font-size: 1.5em;
    text-align: right;
    padding-right: 6px;
`;

const WeaponList = styled.div`
    height: 700px;
    overflow-y: scroll;
`

interface WeaponViewProps {
    name: string;
    hardpointSprite: string;
    type: WeaponType;
    range: number;
    size: WeaponSize;
    ordinancePoints: number;
    onClick?: () => void;
}
const WeaponView: FC<WeaponViewProps> = ({ name, hardpointSprite, type, range, size, ordinancePoints, onClick }) => {
    return <WeaponViewContainer onClick={onClick}>
        <WeaponViewIcon><WeaponHardpoint sprite={hardpointSprite} type={type} /></WeaponViewIcon>
        <WeaponViewName>{name}</WeaponViewName>
        <WeaponViewRange>range: {range}, {size}</WeaponViewRange>
        <WeaponViewOrdinancePoints>{ordinancePoints}</WeaponViewOrdinancePoints>
    </WeaponViewContainer>
};

interface WeaponSelectorProps {
    weaponList: Weapon[];
    weaponSlot?: WeaponSlot;
    setSlotWeapon?: (weapon: Weapon) => void;
}
export const WeaponSelector: FC<WeaponSelectorProps> = ({ weaponList, weaponSlot, setSlotWeapon }) => {
    const dispatchEvent = useDispatch();
    const selectedSlot = useSelector((state: RootState) => state.weaponSlots.selectedSlot);
    const selectedWeapon = useSelector((state: RootState) => {
        return state.weaponSlots.selectedSlot?.selectedWeapon;
    });
    const [filterType, setFiltertype] = useState<WeaponFilterType>("ALL");
    const [filterSize, setFilterSize] = useState<WeaponFilterSize>("ALL");

    const onFilterChanged = (type: WeaponFilterType) => {
        setFiltertype(type);
    }

    const weaponFilterTypes = weaponSlot ? getWeaponTypes(weaponSlot.type) : null;
    const filterByType = (weapon: Weapon) => {
        if (weaponFilterTypes && !weaponFilterTypes.includes(weapon.type)) {
            return false;
        }

        return filterType === "ALL" || weapon.type === filterType;
    }

    const weaponFilterMaxSize: WeaponFilterSize | null = weaponSlot ? weaponSlot.size : null;
    const filterBySize = (weapon: Weapon) => {
        if (!weaponFilterMaxSize || weaponFilterMaxSize === "LARGE") return true;
        if (weaponFilterMaxSize === "MEDIUM") return weapon.size === "MEDIUM" || weapon.size === "SMALL";
        if (weaponFilterMaxSize === "SMALL") return weapon.size === "SMALL";
    }

    return (<div>
        {selectedWeapon ? <WeaponView key={selectedWeapon.id}
            name={selectedWeapon.name}
            hardpointSprite={selectedWeapon.hardpointSprite}
            type={selectedWeapon.type}
            range={selectedWeapon.range}
            size={selectedWeapon.size}
            ordinancePoints={selectedWeapon.OPs} />
            : <WeaponViewContainer />
        }
        <WeaponFilter onFilterChanged={onFilterChanged} />
        <WeaponList>
            {weaponList.filter(w => w.type !== "DECORATIVE" && filterByType(w) && filterBySize(w)).map(w => {
                return <WeaponView
                    key={w.id}
                    name={w.name}
                    hardpointSprite={w.hardpointSprite}
                    type={w.type}
                    range={w.range}
                    size={w.size}
                    ordinancePoints={w.OPs}
                    onClick={() => {
                        if (!selectedSlot) return;
                        dispatchEvent(selectWeaponForSlot(w));
                        dispatchEvent(selectWeaponForShip({ slot: selectedSlot, weapon: w }));
                    }} />
            })}
        </WeaponList>
    </div>)
};