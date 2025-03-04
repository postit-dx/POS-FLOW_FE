import React, {useState} from 'react';
import '../../styles/css/vehicle/SearchForm.css';
import {formatDateWithDots, formatToDashDate} from '../utils/DateFormat.js';
import axios from 'axios';
import {InputField, SelectField} from '../FormInputField.js';

function SearchForm({setVehicles}) {
    const [searchData, setSearchData] = useState({
        inDate: '',
        process: '전체',
        item: '',
        isApproved: 'A'
    });

    const processList = {
        전체: '전체',
        진행차량: '진행차량',
        차량출발: '차량출발',
        입문완료: '입문완료',
        영차계량: '영차계량',
        야드도착: '야드도착'
    };

    const isApprovedList = {
        '전체': 'A',
        '승인': 'Y',
        '대상': 'N'
    }
    
    const searchVehicles = async() => {
        try {
            const response = await axios.get(`/api/vehicle/find?inDate=${searchData.inDate}&process=${searchData.process}&item=${searchData.item}&isApproved=${searchData.isApproved}`)
            const jsonResult = response.data;

            setVehicles(jsonResult.data);
        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

    return (
        <div className='search-form'>
            <div className='header-label'>
                <InputField
                    label={'출발일시'}
                    type={'date'}
                    value={formatToDashDate(searchData.inDate)}
                    className={'input-field'}
                    onChange={(e) => setSearchData({...searchData, inDate: formatDateWithDots(e.target.value)})}
                    />
            </div>  

            <label className='header-label'>
                <SelectField
                    label={'진행상태'}
                    className={'select-field'}
                    onChange={(e) => {setSearchData({...searchData, process: e.target.value})}}
                    value={searchData.process}
                    options={processList}
                    /> 
            </label>

            <label className='header-label'>
                <InputField
                        label={'공급사 Item'}
                        type={'text'}
                        value={searchData.item}
                        className={'input-field'}
                        onChange={(e) => setSearchData({...searchData, item: e?.target?.value || ''})}
                        />
            </label>

            <label className='header-label'>
                <SelectField
                    label={'승인여부'}
                    className={'select-field'}
                    onChange={(e) => {
                        setSearchData({...searchData, isApproved: e.target.value});
                    }}
                    value={searchData.isApproved}
                    options={isApprovedList}
                    />
            </label>

            <button 
                className='search-button'
                onClick={() => { searchVehicles(); }}
                >조회</button>
        </div>
    );
}

export default SearchForm;
