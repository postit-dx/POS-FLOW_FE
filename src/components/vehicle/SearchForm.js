import React from 'react';
import '/src/styles/css/vehicle/SearchForm.css';

function SearchForm(props) {

    return (
        <div>
            <label className='header-label'>
                출발일시
                <input type='date' className='input-field'/>
            </label>

            <label className='header-label'>
                진행상태
                <select className='select-field'>
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
                <input type='text' className='input-field'/>
            </label>

            <label className='header-label'>
                승인여부
                <select className="select-field">
                    <option>전체</option>
                    <option>승인</option>
                    <option>대상</option>
                </select>
            </label>

            <button className='search-button'>조회</button>
        </div>
    );
}

export default SearchForm;