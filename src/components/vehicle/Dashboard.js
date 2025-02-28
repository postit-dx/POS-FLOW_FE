import React, {useState} from 'react';
import '../../styles/css/vehicle/Dashboard.css';
import Modal from 'react-modal';
import AddForm from './AddForm.js';
import Vehicle from './Vehicle.js';

Modal.setAppElement('#root');

function Dashboard({vehicles, fetchVehicles}) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className='table-container'>
            <button 
                className='add-vehicle-button'
                onClick={ () => setModalOpen(true) }
                >신규 등록</button>

            <Modal
                isOpen={modalOpen}
                onRequestClose={ () => setModalOpen(false) }
                className='form-modal' 
                overlayClassName='form-overlay'>
                    <AddForm setModalOpen={setModalOpen} fetchVehicles={fetchVehicles}/>
            </Modal>


            <table className='vehicle-table'>
                <thead>
                    <tr>
                        <th>출발일시</th>
                        <th>차량번호</th>
                        <th>컨테이너번호</th>
                        <th>Po No</th>
                        <th>공급사 ITEM</th>
                        <th>용차여부</th>
                        <th>운송코드</th>
                        <th>진행상태</th>
                        <th>완료일시</th>
                        <th>등록방법</th>
                        <th>출입신청번호</th>
                        <th>계량예약번호</th>
                        <th>차량승인여부</th>
                        <th>검수대상여부</th>
                        <th>승인부서</th>
                        <th>승인자</th>
                        <th>승인일자</th>
                    </tr>
                </thead>
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
                            <td colSpan={16} className='empty-vehicle'>
                                no data
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;

