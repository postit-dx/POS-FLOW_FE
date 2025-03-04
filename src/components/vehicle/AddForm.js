import React, {useState} from 'react';
import '../../styles/css/vehicle/AddForm.css';
import validateAddFormInput from '../utils/Validation';
import {formatDateWithDots, formatDateTimeWithDots} from '../utils/DateFormat';
import axios from 'axios';
import {InputField} from '../FormInputField.js';

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
                            value={vehicleData.vehicleNumber}
                            onChange={(v) => setVehicleData({...vehicleData, vehicleNumber: v.target.value})} />
                    </div>

                    <div className='input-container'>
                        <InputField 
                            label={'방문자명'} 
                            type={'text'} 
                            value={vehicleData.driverName}
                            onChange={(v) => setVehicleData({...vehicleData, driverName: v.target.value})}/>
                    </div>

                    <div className='input-container'>
                        <InputField 
                            label={'방문자 핸드폰 번호'} 
                            type={'text'} 
                            value={vehicleData.driverPhoneNumber}
                            onChange={(v) => setVehicleData({...vehicleData, driverPhoneNumber: v.target.value})}
                            placeholder={'000-0000-000'}/>
                    </div>

                    <div className='input-container'>
                        <InputField 
                            label={'생년월일'} 
                            type={'date'} 
                            value={vehicleData.driverBirth}
                            onChange={(v) => setVehicleData({...vehicleData, driverBirth: v.target.value})}/>
                    </div>

                    <div className='input-container'>
                        <InputField 
                            label={'출발일시'} 
                            type={'datetime-local'} 
                            value={vehicleData.vehicleInDatetime}
                            onChange={(v) => setVehicleData({...vehicleData, vehicleInDatetime: v.target.value})}/>
                    </div>

                    <div className='input-container'>
                        <InputField 
                            label={'방문기간'} 
                            type={'datetime-local'} 
                            value={vehicleData.vehicleOutDatetime}
                            onChange={(v) => setVehicleData({...vehicleData, vehicleOutDatetime: v.target.value})}/>
                    </div>
                </div>

                <div>
                    <h3 className='form-subtitle'>승인자</h3>
                    <div className='input-container'>
                        <InputField 
                            label={'승인자'} 
                            type={'text'} 
                            value={vehicleData.employeeName}
                            onChange={(v) => setVehicleData({...vehicleData, employeeName: v.target.value})}
                            />
                    </div>

                    <div className='input-container'>
                        <InputField 
                            label={'승인자 핸드폰 번호'} 
                            type={'text'} 
                            value={vehicleData.employeePhoneNumber}
                            onChange={(v) => setVehicleData({...vehicleData, employeePhoneNumber: v.target.value})}
                            placeholder={'000-0000-000'}/>
                    </div>

                    <div className='input-container'>
                        <InputField 
                            label={'승인자 부서'} 
                            type={'text'} 
                            value={vehicleData.employeeDepartment}
                            onChange={(v) => setVehicleData({...vehicleData, employeeDepartment: v.target.value})}/>
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
                            inDatetime: formatDateTimeWithDots(vehicleData.vehicleInDatetime),
                            outDatetime: formatDateTimeWithDots(vehicleData.vehicleOutDatetime),
                            driverName: vehicleData.driverName,
                            driverBirth: formatDateWithDots(vehicleData.driverBirth),
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

export default AddForm;