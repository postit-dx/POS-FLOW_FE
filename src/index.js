import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import {CssBaseline, StyledEngineProvider} from "@mui/material";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "./components/vehicle/Dashboard";
import Index from "./components/vehicle";
import Login from "./components/login/Login";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CssBaseline/>
        <StyledEngineProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={"/login"} element={<Login />}></Route>
                    <Route element={<App/>}>
                        <Route path={"/vehicle"} element={<Index />}></Route>
                        <Route path="/*" element={<Navigate to="/" />} />
                    </Route>
                    
                </Routes>
            </BrowserRouter>
        </StyledEngineProvider>
    </React.StrictMode>
);