import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import {CssBaseline, StyledEngineProvider} from "@mui/material";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "./components/vehicle/Dashboard";
import Index from "./components/vehicle";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CssBaseline/>
        <StyledEngineProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<App/>}>
                        <Route index path={"vehicle"} element={<Index />}></Route>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                    <Route path={"/login"} element={<div>로그인 페이지</div>}></Route>
                </Routes>
            </BrowserRouter>
        </StyledEngineProvider>
    </React.StrictMode>
);