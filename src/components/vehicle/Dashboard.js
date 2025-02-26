import React, {useEffect, useState} from 'react';
import Vehicle from "./Vechicle";
import AddForm from "./AddForm";
import Modal from 'react-modal';
import "/src/styles/css/vehicle/Dashboard.css"

function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [vehicles, setVehicles] = useState([]);

    // 초기 로딩 (현재 주석처리)
    // const fetchVehicles = async () => {
    //     try {
    //         const response = await axios.get(`/vehicle`)
    //         const jsonResult = response.data;
    //
    //         setVehicles(jsonResult.data);
    //     } catch(err) {
    //         console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
    //     }
    // }
    // useEffect(() => {
    //     fetchVehicles();
    // }, [vehicles]);

    return (
        <div className='table-container'>
            <button
                className='add-vehicle-button'
                onClick={() => setModalOpen(true)}
            >신규 등록
            </button>

            <Modal
                isOpen={modalOpen}
                onRequestClose={
                    () => setModalOpen(false)
                }
                className='form-modal'
                overlayClassName='form-overlay'>
                <AddForm setModelOpen={setModalOpen}/>
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
                            <td colSpan={17} className='empty-vehicle'>
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