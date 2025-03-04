import React, {useState} from 'react';
import VehicleDetail from './VehicleDetail.js';
import Modal from 'react-modal';
import '../../styles/css/vehicle/Vehicle.css';

function Vehicle({v}) {
    const [vehicleDetailModalOpen, setVehicleDetailModalOpen] = useState(false);

    return (
        <>
            <td>{v.inDatetime}</td>
            <td
                className='underline-vehicle-number'
                onClick={() => setVehicleDetailModalOpen(true)}
                >{v.number}</td>
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
            <td>{v.apDatetime}</td>

            <Modal
                isOpen={vehicleDetailModalOpen}
                onRequestClose={ () => setVehicleDetailModalOpen(false) }
                className='form-modal' 
                overlayClassName='form-overlay'>
                    <VehicleDetail 
                        setModalOpen={setVehicleDetailModalOpen}
                        id={v.id}/>
            </Modal>
        </>
    );
}

export default Vehicle;