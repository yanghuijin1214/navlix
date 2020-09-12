import React from 'react';
import logo from '../logo.png';

function Logo(){
    return(<h1 className="title">
    <a href="/">
      <img src={logo} alt="naver" />
    </a>
</h1>)
}

export default Logo;