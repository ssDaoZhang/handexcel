import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';
import './Navbars.css';
const Navbars = ({index}) => {

    return(
        <div className='navbars'>
            <Link to='/' className={`navbars__item ${ index == '/' && 'navbars__item--active'}`}>
                上传银行卡Excel表数据
            </Link>
            <Link to='/balance' className={`navbars__item ${ index == '/balance' && 'navbars__item--active'}`}>
                查看银行卡余额
            </Link>
        </div>
    );
}
export default Navbars;