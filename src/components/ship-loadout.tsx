import * as React from 'react'
import { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../state/store';

const OPMeter = styled.div`
    display: flex;
    flex-direction: column;
`;

const StatBlock = styled.div`
    display: flex;
    flex-direction: row;
`;

const StatWithLabel = styled.div`
    display: flex;
    flex-direction: column;
`;

const AdjustAmountButton = styled.button`
    width: 1rem;
    height: 1rem;
    border-radius: .2rem;
`

export const ShipLoadout = () => {
    const selectedShip = useSelector((state: RootState) => state.ship.selectedShip);

    const loadoutOPs = selectedShip?.weaponSlots.reduce((total, slot) => total + (slot.selectedWeapon?.OPs || 0), 0);

    return (
        <div>
            {selectedShip && <>
                <OPMeter>
                    <progress max={selectedShip.OPs} value={loadoutOPs} />
                    <span>{loadoutOPs}/{selectedShip.OPs}</span>
                </OPMeter>
                <StatBlock>
                    <StatWithLabel>
                        <span>TOP SPEED</span>
                        <span>{selectedShip.topSpeed}</span>
                    </StatWithLabel>
                    <StatWithLabel>
                        <span>ARMOR</span>
                        <span>{selectedShip.armor}</span>
                    </StatWithLabel>
                    <StatWithLabel>
                        <span>HULL</span>
                        <span>{selectedShip.hull}</span>
                    </StatWithLabel>
                </StatBlock>
                <div>
                    Capacitors <AdjustAmountButton>-</AdjustAmountButton> 0 <AdjustAmountButton>+</AdjustAmountButton> <StatWithLabel>
                        <span>FLUX CAPACITY</span>
                        <span>{selectedShip.fluxCapacity}</span>
                    </StatWithLabel>
                </div>
                <div>
                    Vents <AdjustAmountButton>-</AdjustAmountButton> 0 <AdjustAmountButton>+</AdjustAmountButton> <StatWithLabel>
                        <span>FLUX DISSIPATION</span>
                        <span>{selectedShip.fluxDissipation}</span>
                    </StatWithLabel>
                </div>
                <StatBlock>
                    <StatWithLabel>
                        <span>SHIELD ARC</span>
                        <span>{selectedShip.shieldArc}</span>
                    </StatWithLabel>
                    <StatWithLabel>
                        <span>SHIELD FLUX/SEC</span>
                        <span>{selectedShip.shieldUpkeep * selectedShip.fluxDissipation}</span>
                    </StatWithLabel>
                    <StatWithLabel>
                        <span>SHIELD FLUX/DAM</span>
                        <span>{selectedShip.shieldEfficiency}</span>
                    </StatWithLabel>
                </StatBlock>
                <StatBlock>
                    <StatWithLabel>
                        <span>WEAPON FLUX/SEC</span>
                        <span>{0}</span>
                    </StatWithLabel>
                </StatBlock>
            </>}
        </div >
    );
}
