import React, {useState} from 'react';
import '../../styles/css/vehicle/SearchForm.css';
import formatDate from './utils/DateFormat.js';
import axios from 'axios';

function SearchForm({setVehicles}) {
    const [searchData, setSearchData] = useState({
        inDate: '',
        process: '전체',
        item: '',
        isApproved: 'A'
    });

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
        <div>
            <label className='header-label'>
                출발일시
                <input 
                    type='date' 
                    className='input-field'
                    onChange={(event) => setSearchData({...searchData, inDate: formatDate(event.target.value)})}
                    />
            </label>

            <label className='header-label'>
                진행상태
                <select 
                    className='select-field'
                    onChange={(event) => setSearchData({...searchData, process: event.target.value})}>
                    <option>전체</option>
                    <option>진행차량</option>
                    <option>차량출발</option>
                    <option>입문완료</option>
                    <option>영차계량</option>
                    <option>야드도착</option>
                </select>
            </label>

            <label className='header-label'>
                공급사 Item
                <input 
                    type='text' 
                    className='input-field'
                    onChange={(event) => setSearchData({...searchData, item: event.target.value})}/>
            </label>

            <label className='header-label'>
                승인여부
                <select 
                    className="select-field"
                    onChange={(event) => {
                        const valueMap = {
                            '전체': 'A',
                            '승인': 'Y',
                            '대상': 'N'
                        };
                        setSearchData({...searchData, isApproved: valueMap[event.target.value]});
                    }}>
                    <option>전체</option>
                    <option>승인</option>
                    <option>대상</option>
                </select>
            </label>

            <button 
                className='search-button'
                onClick={() => { searchVehicles(); }}
                >조회</button>
        </div>
    );
}

export default SearchForm;
