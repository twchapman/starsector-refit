import * as React from 'react'
import { FC } from 'react';
import styled from 'styled-components';
import { useStore } from '../state/useStore';
import ShipModel from '../model/ShipModel';

const OPMeter = styled.div`
    position: relative;

    progress {
        appearance: none;
        width: 100%;
    }

    progress::-webkit-progress-bar {
        background: #124368;
        background: linear-gradient(0deg, #124368 0%, #124368 50%, #0C2F49 100%);
    }

    progress::-webkit-progress-value {
        background: rgb(28,111,174);
        background: linear-gradient(0deg, rgba(28,111,174,1) 0%, rgba(28,196,255,1) 50%, rgba(28,111,174,1) 100%);
    }

    progress::-moz-progress-bar {
        background: rgb(28,111,174);
        background: linear-gradient(0deg, rgba(28,111,174,1) 0%, rgba(28,196,255,1) 50%, rgba(28,111,174,1) 100%);
    }

    span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;
        color: #FFD200;
    }
`;

const StatBlock = styled.div`
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: repeat(3, 1fr);

    .stat-label {
        text-transform: uppercase;
        color: #fff;
        font-size: 8px;
    }

    .stat-value {
        color: #FFD200;
        font-size: 20px;
    }
`;

const StatWithLabel = styled.div`
display: flex;
flex - direction: column;
`;

const AdjustAmountButton = styled.button`
    width:20px;
    height: 20px;
    border-radius: 5px;
    border: none;
    background: #15404D;
    color: #fff;

    &:hover {
        background: #194957;
    }
`;

export const ShipLoadout = () => {
    const selectedShip = useStore(s => s.selectedShip);
    const shipModel = useStore(s => s.shipModel);

    let loadoutOPs = 0;
    if (selectedShip) {
        const model = shipModel ?? new ShipModel(selectedShip);
        loadoutOPs = model.weaponSlots.reduce((total, slot) => total + (slot.selectedWeapon?.OPs || 0), 0);
    }

    return (
        <div>
            {selectedShip && <>
                <OPMeter>
                    <progress max={selectedShip.OPs} value={loadoutOPs} />
                    <span className="black-outline">{loadoutOPs}/{selectedShip.OPs}</span>
                </OPMeter>
                <StatBlock>
                    <span className="stat-label black-outline">TOP SPEED</span>
                    <span className="stat-label black-outline">ARMOR</span>
                    <span className="stat-label black-outline">HULL</span>
                    <span className="stat-value black-outline">{selectedShip.topSpeed}</span>
                    <span className="stat-value black-outline">{selectedShip.armor}</span>
                    <span className="stat-value black-outline">{selectedShip.hull}</span>
                </StatBlock>
                <div>
                    <span className="white-text black-outline">Capacitors</span> <AdjustAmountButton>-</AdjustAmountButton> 0 <AdjustAmountButton>+</AdjustAmountButton> <StatWithLabel>
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
