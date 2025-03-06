import React, {useState} from 'react';
import '../../styles/css/vehicle/Dashboard.css';
import Modal from 'react-modal';
import AddForm from './AddForm.js';

import {TableThead, TableTbody} from '../TableField.js';

Modal.setAppElement('#root');

function Dashboard({vehicles, fetchVehicles}) {
    const [modalOpen, setModalOpen] = useState(false);

    const tableHeaders = [
        "차량번호", "출발일시",  "방문기간", "Po No", 
        "공급사 ITEM", "운송코드", "진행상태", 
        "출입신청번호", "차량승인여부", 
        "검수대상여부", "피방문자", "피방문자 부서", "차량승인일자"
    ];
    

    return (
        <div className='table-container'>
            <button 
                className='add-vehicle-button'
                onClick={ () => setModalOpen(true) }
                >신규 등록</button>

            <Modal
                isOpen={modalOpen}
                shouldCloseOnOverlayClick={false}
                onRequestClose={ () => setModalOpen(false) }
                className='form-modal' 
                overlayClassName='form-overlay'>
                    <AddForm setModalOpen={setModalOpen} fetchVehicles={fetchVehicles}/>
            </Modal>


            <table className='vehicle-table'>
                <TableThead tableHeaders={tableHeaders}/>
                <TableTbody vehicles={vehicles} totalColumnCount={tableHeaders.length}/>
            </table>
        </div>
    );
}

export default Dashboard;

