import React from 'react';
import { HeaderContainer } from './styles';
import logo from '../../assets/img/logo.svg';
import { Scroll, Timer } from 'phosphor-react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
  <HeaderContainer>
     <img src={logo} alt="" />
    <nav>
      <NavLink to="/" title='Timer'>
        <Timer size={24}/>
      </NavLink>
      <NavLink to="history" title='Histórico'>
        <Scroll size={24}/>
      </NavLink>
    </nav>
  </HeaderContainer>
  
  )
}

export default Header