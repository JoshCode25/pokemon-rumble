import React from 'react';

const InfoLine = ({name, value}) => {
    return (
        <div className='flex'>
            <p>{`${name}: `}</p>
            <p>{value}</p>
        </div>
    )
}

export default InfoLine;