import * as React from 'react'
import { FC, useState } from 'react';
import styled from 'styled-components';
import { Weapon, WeaponType } from '../Weapon';
import { WeaponFilter, WeaponFilterType } from './weapon-filter';

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

const WeaponViewIcon = styled.img`
    grid-area: icon;
`;

const WeaponViewName = styled.span`
    grid-area: name;
    line-height: 34px;
`;

const WeaponViewRange = styled.span`
    grid-area: range;
    color: #E6BD00;
    line-height: 36px;
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
    type: WeaponType;
    range: number;
    ordinancePoints: number;
}
const WeaponView: FC<WeaponViewProps> = ({ name, range, ordinancePoints }) => {
    return <WeaponViewContainer>
        <WeaponViewIcon></WeaponViewIcon>
        <WeaponViewName>{name}</WeaponViewName>
        <WeaponViewRange>range: {range}</WeaponViewRange>
        <WeaponViewOrdinancePoints>{ordinancePoints}</WeaponViewOrdinancePoints>
    </WeaponViewContainer>
};

interface WeaponSelectorProps {
    weaponList: Weapon[];
}
export const WeaponSelector: FC<WeaponSelectorProps> = ({ weaponList }) => {
    const [filterType, setFiltertype] = useState<WeaponFilterType>("ALL");

    const onFilterChanged = (type: WeaponFilterType) => {
        setFiltertype(type);
    }

    return (<>
        <WeaponView name="Sabot SRM"
            type={"MISSILE"}
            range={1200}
            ordinancePoints={4} />
        <WeaponFilter onFilterChanged={onFilterChanged} />
        <WeaponList>
            {weaponList.filter(w => w.type !== "DECORATIVE" && (filterType === "ALL" || w.type === filterType)).map(w => {
                return <WeaponView key={w.id} name={w.name} type={w.type} range={w.range} ordinancePoints={w.OPs} />
            })}
        </WeaponList>
    </>)
};