import React, {useState} from 'react';
import '../../styles/css/vehicle/AddForm.css';
import validateAddFormInput from './utils/Validation';
import formatDate, {formatDateTime} from './utils/DateFormat';
import axios from 'axios';

function AddForm({setModalOpen, fetchVehicles}) {
    const [vehicleData, setVehicleData] = useState({
        vehicleNumber: '',
        driverName: '',
        driverPhoneNumber: '',
        driverBirth: '',
        vehicleInDatetime: '',
        vehicleOutDatetime: '',
        employeeName: '',
        employeeDepartment: '',
        employeePhoneNumber: ''
    });

    const addVehicles = async (vehicle) => {
        try {
            const response = await axios.post(`/api/vehicle`, vehicle, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const jsonResult = response.data;

            if(jsonResult.result === 'fail') {
                throw new Error(`${jsonResult.mesage}`);
            } else {
                setModalOpen(false)
                fetchVehicles();
            }
        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

    return (
        <div className='add-form'>
            <h2 className='form-title'>신규 차량 등록</h2>
            <form className='form-container'>
                <div>
                    <h3 className='form-subtitle'>방문자</h3>
                    <div className='input-container'>
                        <InputField 
                            label={'차량번호'} 
                            type={'text'} 
                            name={vehicleData.vehicleNumber} 
                            value={vehicleData.vehicleNumber}
                            onChange={(v) => setVehicleData({...vehicleData, vehicleNumber: v})} />
                    </div>

                    <div className='input-container'>
                        <InputField 
                            label={'방문자명'} 
                            type={'text'} 
                            name={vehicleData.driverName} 
                            value={vehicleData.driverName}
                            onChange={(v) => setVehicleData({...vehicleData, driverName: v})}/>
                    </div>

                    <div className='input-container'>
                        <InputField 
                            label={'방문자 핸드폰 번호'} 
                            type={'text'} 
                            name={vehicleData.driverPhoneNumber} 
                            value={vehicleData.driverPhoneNumber}
                            onChange={(v) => setVehicleData({...vehicleData, driverPhoneNumber: v})}
                            placeholder={'000-0000-000'}/>
                    </div>

                    <div className='input-container'>
                        <InputField 
                            label={'생년월일'} 
                            type={'date'} 
                            name={vehicleData.driverBirth} 
                            value={vehicleData.driverBirth}
                            onChange={(v) => setVehicleData({...vehicleData, driverBirth: v})}/>
                    </div>

                    <div className='input-container'>
                        <InputField 
                            label={'출발일시'} 
                            type={'datetime-local'} 
                            name={vehicleData.vehicleInDatetime} 
                            value={vehicleData.vehicleInDatetime}
                            onChange={(v) => setVehicleData({...vehicleData, vehicleInDatetime: v})}/>
                    </div>

                    <div className='input-container'>
                        <InputField 
                            label={'방문기간'} 
                            type={'datetime-local'} 
                            name={vehicleData.vehicleOutDatetime} 
                            value={vehicleData.vehicleOutDatetime}
                            onChange={(v) => setVehicleData({...vehicleData, vehicleOutDatetime: v})}/>
                    </div>
                </div>

                <div>
                    <h3 className='form-subtitle'>승인자</h3>
                    <div className='input-container'>
                        <InputField 
                            label={'승인자'} 
                            type={'text'} 
                            name={vehicleData.employeeName} 
                            value={vehicleData.employeeName}
                            onChange={(v) => setVehicleData({...vehicleData, employeeName: v})}
                            />
                    </div>

                    <div className='input-container'>
                        <InputField 
                            label={'승인자 핸드폰 번호'} 
                            type={'text'} 
                            name={vehicleData.employeePhoneNumber} 
                            value={vehicleData.employeePhoneNumber}
                            onChange={(v) => setVehicleData({...vehicleData, employeePhoneNumber: v})}
                            placeholder={'000-0000-000'}/>
                    </div>

                    <div className='input-container'>
                        <InputField 
                            label={'승인자 부서'} 
                            type={'text'} 
                            name={vehicleData.employeeDepartment} 
                            value={vehicleData.employeeDepartment}
                            onChange={(v) => setVehicleData({...vehicleData, employeeDepartment: v})}/>
                    </div>
                </div>
            </form>
            <button 
                className='add-button'
                onClick={() => {
                    if(validateAddFormInput(
                        vehicleData.vehicleNumber,
                        vehicleData.vehicleInDatetime,
                        vehicleData.vehicleOutDatetime,
                        vehicleData.driverName,
                        vehicleData.driverBirth,
                        vehicleData.driverPhoneNumber,
                        vehicleData.employeeName,
                        vehicleData.employeeDepartment,
                        vehicleData.employeePhoneNumber
                    )) {
                        const vehicle = {
                            number: vehicleData.vehicleNumber,
                            inDatetime: formatDateTime(vehicleData.vehicleInDatetime),
                            outDatetime: formatDateTime(vehicleData.vehicleOutDatetime),
                            driverName: vehicleData.driverName,
                            driverBirth: formatDate(vehicleData.driverBirth),
                            driverPhone: vehicleData.driverPhoneNumber,
                            employeeName: vehicleData.employeeName,
                            employeeDep: vehicleData.employeeDepartment,
                            employeePhone: vehicleData.employeePhoneNumber
                        }
                        addVehicles(vehicle);
                    }                    
                }}
                >등록하기</button>
        </div>
    );
}

function InputField({label, type, name, value, onChange, placeholder}) {
    return(
        <div className='input-container'>
            <label>{label}</label>
            <input 
                type={type}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}/>
        </div>
    )
}

export default AddForm;