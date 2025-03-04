import React from 'react';
import Vehicle from './vehicle/Vehicle';

export function TableThead({tableHeaders}) {
    return (
        <thead>
            <tr>
                {tableHeaders.map((label, index) => (
                    <th key={index}>{label}</th>
                ))}
            </tr>
        </thead>
    )
}

export function TableTbody({vehicles, totalColumnCount}) {
    const emptyStyle = {
        textAlign: 'center',
        color: 'gray',
    };

    return (
        <tbody>
            {
                vehicles.length > 0 ?
                (vehicles.map((v, index) => (
                    <tr key={index}>
                        <Vehicle v={v}/>
                    </tr>
                )))
                :
                <tr>
                    <td colSpan={totalColumnCount} style={emptyStyle}>
                        no data
                    </td>
                </tr>
            }
        </tbody>
    )
}
