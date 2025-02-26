import React from 'react';

function Vehicle({v}) {
    return (
        <>
            <td>{v.inDatetime}</td>
            <td>{v.number}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{v.outDatetime}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{v.isApproved}</td>
            <td>{v.needInspection}</td>
            <td>{v.employeeDep}</td>
            <td>{v.employeeName}</td>
            <td>{}</td>
        </>
    );
}

export default Vehicle;