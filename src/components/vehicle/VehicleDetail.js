import React, { useEffect, useState } from 'react';
import '../../styles/css/vehicle/VehicleDetail.css';
import axios from 'axios';

function VehicleDetail({setModalOpen, id}) {
    const [vehicleDetail, setVehicleDetail] = useState([]);
    const [initIsApproved, setInitIsApproved] = useState();
    const [initNeedInspection, setInitNeedInspection] = useState();

    const fetchVehicleDetail = async () => {
        try {
            const response = await axios.get(`/vehicle/${id}`);
            const { data } = response.data;

            setVehicleDetail(data);
            setInitIsApproved(data.isApproved);
            setInitNeedInspection(data.needInspection);
        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

    const putVehicleApproveStatus = async (option) => {
        try {
            await axios.put(`/vehicle/${id}/changeApproval?isApproved=${option}`);
            setInitIsApproved(vehicleDetail.isApproved);
        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

    const putVehicleInspectionStatue = async (option) => {
        try {
            await axios.put(`/vehicle/${id}/changeNeedInspection?needInspection=${option}`);
            setInitNeedInspection(vehicleDetail.needInspection);
        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

    useEffect(() => {
        fetchVehicleDetail();
    }, []);

    const handleRadioChange = (field, value) => {
        setVehicleDetail(prevVehicleDetail => ({
            ...prevVehicleDetail,
            [field]: value
        }));
    };

    return (
        <div className='vehicle-detail'>
            <h2 className='detail-title'>차량 정보</h2>
            <div className='detail-container'>
                <div>
                    <h3 className='subtitle'>방문자</h3>
                    <DataField label={'차량번호'} context={vehicleDetail.number}/>
                    <DataField label={'운전자명'} context={vehicleDetail.driverName}/>
                    <DataField label={'운전자 핸드폰 번호'} context={vehicleDetail.driverPhone}/>
                    <DataField label={'출발일시'} context={vehicleDetail.inDatetime}/>
                    <DataField label={'완료일시'} context={vehicleDetail.outDatetime}/>
                </div>

                <div>
                    <h3 className='subtitle'>승인자</h3>
                    <DataField label={'승인자'} context={vehicleDetail.employeeName}/>
                    <DataField label={'승인자 핸드폰 번호'} context={vehicleDetail.employeePhone}/>
                    <DataField label={'승인자 부서'} context={vehicleDetail.employeeDep}/>
                     <RadioDataField 
                        label={'차량승인여부'} 
                        radioOptions={[
                            { id: 'Y', label: 'Y', value: 'Y', checked: vehicleDetail.isApproved === 'Y', field: 'isApproved' },
                            { id: 'N', label: 'N', value: 'N', checked: vehicleDetail.isApproved === 'N', field: 'isApproved' }
                        ]}
                        onRadioChange={handleRadioChange}
                        vehicleDetail={vehicleDetail}
                        selectedOption='isApproved'
                        initValue={initIsApproved}
                        onChangeRadioStatus={putVehicleApproveStatus}
                        />
                    <RadioDataField 
                        label={'검수대상여부'} 
                        radioOptions={[
                            { id: 'Y', label: 'Y', value: 'Y', checked: vehicleDetail.needInspection === 'Y', field: 'needInspection' },
                            { id: 'N', label: 'N', value: 'N', checked: vehicleDetail.needInspection === 'N', field: 'needInspection' }
                        ]}
                        onRadioChange={handleRadioChange}
                        vehicleDetail={vehicleDetail}
                        selectedOption='needInspection'
                        initValue={initNeedInspection}
                        onChangeRadioStatus={putVehicleInspectionStatue}
                        />
                        
                </div>
            </div>

            <button
                className='confirm-button'
                onClick={() => {
                    setModalOpen(false);
                }}>
                확인
            </button>
        </div>
    );
}


function DataField({ label, context }) {
    return (
      <div className="context-container">
        <label>{label}</label>
        <div>{context}</div>
      </div>
    );
  }

function RadioDataField({
    label, 
    radioOptions, 
    onRadioChange, 
    vehicleDetail, 
    selectedOption, 
    initValue,
    onChangeRadioStatus
}) {
    const disabledButtonColor = '#0056b3';
    const enabledButtonColor = '#007bff';

    return (
        <div className='context-container'>
            <label>{label}</label>
            <div>
                {radioOptions.map(option => (
                    <div
                        className='radio-container'
                        key={option.id}>
                            <input
                                type='radio'
                                name={option.field}
                                id={option.id}
                                value={option.value}
                                checked={option.checked}
                                onChange={() => onRadioChange(option.field, option.value)}
                                />
                        {option.label}
                    </div>
                ))}

                <button 
                    onClick={() => {
                        if(selectedOption === 'isApproved') {
                            onChangeRadioStatus(vehicleDetail.isApproved);
                        } else {
                            onChangeRadioStatus(vehicleDetail.needInspection);
                        }
                    }}
                    className='update-button'
                    style={{ backgroundColor: vehicleDetail[selectedOption] === initValue ? disabledButtonColor : enabledButtonColor }}
                    disabled={vehicleDetail[selectedOption] === initValue}>
                    변경하기
                </button>
            </div>
        </div>
    )
}

export default VehicleDetail;