import React, {useState, useEffect} from 'react';
import SearchForm from './SearchForm.js';
import Dashboard from "./Dashboard.js";
import axios from 'axios';
import '../../styles/css/vehicle/App.css';

function Index() {
    const [vehicles, setVehicles] = useState([]);

    const fetchVehicles = async () => {
        try {
            const response = await axios.get(`/vehicle`)
            const jsonResult = response.data;

            setVehicles(jsonResult.data);
        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    } 

    useEffect(() => {
        fetchVehicles();
    }, []);

    return (
        <>
            <SearchForm setVehicles={setVehicles}/>
            {/* <Dashboard vehicles={vehicles} fetchVehicles={fetchVehicles}/> */}
        </>
    );
}

export default Index;