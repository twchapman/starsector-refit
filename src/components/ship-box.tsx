import * as React from 'react'
import { FC, useState } from 'react';
import styled from 'styled-components';
import { Ship } from '../Ship';

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85px;
    height: 85px;
    padding: 5px;
    background: #000000;

    &:hover {
        background: #184A55;
    }
`;

const Name = styled.span`
    color: #FFFFFF;
    font-size: 18px;
`;

const Sprite = styled.div<{ imageUrl: string }>`
    background-image: url(${props => props.imageUrl});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 100%;
    height: 100%;
`;

interface ShipBoxProps {
    name: string;
    spritePath: string;
}
export const ShipBox: FC<ShipBoxProps> = ({ name, spritePath }) => {
    return (
        <Box>
            <Name>{name}</Name>
            <Sprite imageUrl={spritePath} />
        </Box>
    )
}