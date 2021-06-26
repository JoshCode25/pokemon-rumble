import React from 'react';

const MoveInfo = ({name, type, power, accuracy, levelLearnedAt}) => {
    return (
        <div className='flex flex-column pa1 grow'>
            <h3 className='ma0 pv2'>{name.toUpperCase()}</h3>
            <div className='flex justify-between ph2'>
                <p className='ph2 ma0'>{`Learned at LV: ${levelLearnedAt}`}</p>
                <p className='ph2 ma0'>{type}</p>
            </div>
            <div className='flex justify-between ph2'>
                <p className='ph2 ma0'>{`Power: ${power}`}</p>
                <p className='ph2 ma0'>{`Accuracy: ${accuracy}%`}</p>
            </div>
        </div>
    )
}

export default MoveInfo;