import React, {useState} from 'react';
import '../../styles/css/vehicle/Dashboard.css';
import Modal from 'react-modal';
import AddForm from './AddForm.js';

import {TableThead, TableTbody} from '../TableField.js';

Modal.setAppElement('#root');

function Dashboard({vehicles, fetchVehicles}) {
    const [modalOpen, setModalOpen] = useState(false);

    const tableHeaders = [
        "출발일시", "차량번호", "컨테이너번호", "Po No", 
        "공급사 ITEM", "용차여부", "운송코드", "진행상태", 
        "완료일시", "등록방법", "출입신청번호", "계량예약번호", 
        "차량승인여부", "검수대상여부", "승인부서", "승인자", "승인일자"
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

