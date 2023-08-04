import '../../Calendar Components/CSS/DateCard.css';
import React from 'react';

const EmployeeCard = ({ firstName, lastName, employeeID }) => {
    return (
        <>
            <div className="EmployeeCard" style={{ marginLeft: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p className="date" style={{ margin: '0', paddingTop: '4px' }}>{firstName} {lastName}</p>
                <p className="date" style={{ margin: '0', paddingBottom: '4px', paddingTop: '0px' }}>Employee ID: {employeeID}</p>
            </div>
        </>
    )
}


export default EmployeeCard;