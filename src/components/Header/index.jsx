import React from 'react';

import logoml from '../../assets/logo-ml.png';
import './style.css';

const Header = () => (
    <header className="header">
        <div className="mld-grid">
            <div className="mdl-cell--12-col">
                <img
                    alt='Logo'
                    src={logoml}
                    className='header__logo'
                />
            </div>
        </div>
    </header>
);

export default Header;