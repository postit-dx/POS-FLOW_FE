import React, {useState} from 'react';
import '/src/styles/css/vehicle/AddForm.css';
// import axios from 'axios';

function AddForm({setModelOpen}) {
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

    // 데이터 통신 (주석처리)
    const addVehicles = async (vehicle) => {
        // try {
        //     const response = await axios.post(`/vehicle`, vehicle, {
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     const jsonResult = response.data;
        //
        //     if(jsonResult.result === 'fail') {
        //         throw new Error(`${jsonResult.mesage}`);
        //     } else {
        //         setModelOpen(false)
        //     }
        // } catch(err) {
        //     console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        // }
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
                            label={'운전자명'}
                            type={'text'}
                            name={vehicleData.driverName}
                            value={vehicleData.driverName}
                            onChange={(v) => setVehicleData({...vehicleData, driverName: v})}/>
                    </div>

                    <div className='input-container'>
                        <InputField
                            label={'핸드폰 번호'}
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
                    <h3 className='form-subtitle'>피방문자</h3>
                    <div className='input-container'>
                        <InputField
                            label={'피방문자명'}
                            type={'text'}
                            name={vehicleData.employeeName}
                            value={vehicleData.employeeName}
                            onChange={(v) => setVehicleData({...vehicleData, employeeName: v})}
                        />
                    </div>

                    <div className='input-container'>
                        <InputField
                            label={'피방문자 핸드폰 번호'}
                            type={'text'}
                            name={vehicleData.employeePhoneNumber}
                            value={vehicleData.employeePhoneNumber}
                            onChange={(v) => setVehicleData({...vehicleData, employeePhoneNumber: v})}
                            placeholder={'000-0000-000'}/>
                    </div>

                    <div className='input-container'>
                        <InputField
                            label={'피방문자 부서'}
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
                    const vehicle = {
                        number: vehicleData.vehicleNumber,
                        inDatetime: formatDateTime(vehicleData.vehicleInDatetime, false),
                        outDatetime: formatDateTime(vehicleData.vehicleOutDatetime, false),
                        driverName: vehicleData.driverName,
                        driverBirth: formatDateTime(vehicleData.driverBirth, true),
                        driverPhone: vehicleData.driverPhoneNumber,
                        employeeName: vehicleData.employeeName,
                        employeeDep: vehicleData.employeeDepartment,
                        employeePhone: vehicleData.employeePhoneNumber
                    }
                    addVehicles(vehicle);
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

const formatDateTime = (datetime, isBirth) => {
    if (!datetime) return '';
    const date = new Date(datetime);
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    if(isBirth) {
        return `${yyyy}.${MM}.${dd}`;
    } else {
        const HH = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        return `${yyyy}.${MM}.${dd} ${HH}:${mm}:00`;
    }
};

export default AddForm;