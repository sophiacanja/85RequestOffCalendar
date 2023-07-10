import './DateCard.css';
import React from 'react';

const EmployeeCard = ({ firstName, lastName, employeeID }) => {
    return (
        <>
            <div className="card" style={{ marginLeft: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p className="date" style={{ margin: '0' }}>{firstName} {lastName}</p>
                <p className="date" style={{ margin: '0' }}>Employee ID: {employeeID}</p>
            </div>
        </>
    )
}


export default EmployeeCard;