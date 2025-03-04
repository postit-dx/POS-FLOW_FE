import React, {useEffect, useState} from 'react';
import VehicleDetail from './VehicleDetail.js';
import Modal from 'react-modal';
import '../../styles/css/vehicle/Vehicle.css';

function Vehicle({v}) {
    const [vehicleDetailModalOpen, setVehicleDetailModalOpen] = useState(false);
    const [isApproved, setIsApproved] = useState(v.isApproved);
    const [needInspection, setNeedInspection] = useState(v.needInspection);
    const [apDatetime, setApDatetime] = useState(v.apDatetime);

    useEffect(() => {
        setIsApproved(v.isApproved);
        setNeedInspection(v.needInspection);
        setApDatetime(v.apDatetime);
    }, [v]);
    
    function saveIsApproved (flag, datetime) {
        setIsApproved(flag);
        setApDatetime(datetime);
    }

    function saveNeedInspection(flag) {
        setNeedInspection(flag);
    }

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
            <td>{isApproved}</td>
            <td>{needInspection}</td>
            <td>{v.employeeDep}</td>
            <td>{v.employeeName}</td>
            <td>{apDatetime}</td>

            <Modal
                isOpen={vehicleDetailModalOpen}
                shouldCloseOnOverlayClick={false}
                onRequestClose={ () => setVehicleDetailModalOpen(false) }
                className='form-modal' 
                overlayClassName='form-overlay'>
                    <VehicleDetail 
                        setModalOpen={setVehicleDetailModalOpen}
                        saveIsApproved={saveIsApproved}
                        saveNeedInspection={saveNeedInspection}
                        id={v.id}/>
            </Modal>
        </>
    );
}

export default Vehicle;