import React from 'react';
import "/src/styles/css/login/Header.css";

function Header(props) {
    return (
        <div className="Header">
            <img src="assets/images/logo_kor.jpg" alt="posco DX"/>
            <p>
                원료 반입 시스템 PosFlow
            </p>
        </div>
    );
}

export default Header;