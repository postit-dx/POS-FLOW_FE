import React, {useEffect, useState} from 'react';
import '../../styles/css/vehicle/Vehicle.css';
import axios from 'axios';

function Vehicle({v}) {
    const [vehicleDetail, setVehicleDetail] = useState([]);
    const [initIsApproved, setInitIsApproved] = useState();
    const [apDatetime, setApDatetime] = useState();
    const [initNeedInspection, setInitNeedInspection] = useState();

    const [isApproved, setIsApproved] = useState(v.isApproved);
    const [needInspection, setNeedInspection] = useState(v.needInspection);


    const putVehicleApproveStatus = async (option) => {
        try {
            const response = await axios.put(`/api/vehicle/${vehicleDetail.id}/changeApproval?isApproved=${option}`);
            const { data } = response.data;

            setInitIsApproved(data.isApproved);
            setApDatetime(data.apDatetime);
        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

    const putVehicleInspectionStatue = async (option) => {
        try {
            const response = await axios.put(`/api/vehicle/${vehicleDetail.id}/changeNeedInspection?needInspection=${option}`);
            const { data } = response.data;

            setInitNeedInspection(data.needInspection);
        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

    useEffect(() => {
        setVehicleDetail(v);
        setInitIsApproved(v.isApproved);
        setApDatetime(v.apDatetime);
        setInitNeedInspection(v.needInspection);
    }, [v]);

    const handleRadioChange = (field, value) => {
        setVehicleDetail(prevVehicleDetail => ({
            ...prevVehicleDetail,
            [field]: value
        }));
    };
    
    return (
        <>
            <td className='vehicle-number'>{vehicleDetail.number}</td>
            <td>{vehicleDetail.inDatetime}</td>
            <td>{vehicleDetail.outDatetime}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{
               <RadioDataField 
                    vehicleDetail={vehicleDetail}
                    radioOptions={[
                        { id: 'Y', label: 'Y', value: 'Y', checked: vehicleDetail.isApproved === 'Y', field: 'isApproved' },
                        { id: 'N', label: 'N', value: 'N', checked: vehicleDetail.isApproved === 'N', field: 'isApproved' }
                    ]}
                    onRadioChange={handleRadioChange}
                    selectedOption='isApproved'
                    initValue={initIsApproved}
                    onChangeRadioStatus={putVehicleApproveStatus}
                />
            }</td>
            <td>{needInspection}</td>
            <td>{vehicleDetail.employeeName}</td>
            <td>{vehicleDetail.employeeDep}</td>
            <td>{apDatetime}</td>
        </>
    );
}

function RadioDataField({
    vehicleDetail,
    radioOptions, 
    onRadioChange, 
    selectedOption, 
    initValue,
    onChangeRadioStatus
}) {
    const disabledButtonColor = 'RGB(5, 80, 125)';
    const enabledButtonColor = 'RGB(0, 165, 229';

    return (
        <div className='context-container'>
            <div>
                {radioOptions.map(option => (
                    <div
                        className='radio-container'
                        key={option.id}>
                            <input
                                type='radio'
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
                    disabled={vehicleDetail[selectedOption] === initValue}
                    >
                    변경하기
                </button>
            </div>
        </div>
    )
}

export default Vehicle;