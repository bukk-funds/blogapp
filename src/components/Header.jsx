import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import CreatePost from '../pages/CreatePost'; // Import your CreatePost component
import Login from '../pages/Login';
import '../style.css';
import {signOut} from 'firebase/auth'
import { auth } from '../firebase'
import SearchComponent from '../components/SearchComponent';

const Header = ({ isAuth, setIsAuth }) => {
  const [menuClass, setMenuClass] = useState('');
  const [showNav, setShowNav] = useState(false);
   
   const signUserOut = () =>{
     signOut(auth).then(() =>{
      // localStorage.clear();
      localStorage.removeItem('isAuth');
       setIsAuth(false);
       window.location.pathname = '/login'
     })
   }
   
  useEffect(() => {
    const container = document.querySelector('.container');
    const ul = document.querySelector('ul');

    const toggleMenu = () => {
      setMenuClass((prevClass) => (prevClass === 'change' ? '' : 'change'));
      setShowNav((prevShowNav) => !prevShowNav);
    };

    container.addEventListener('click', toggleMenu);

    return () => {
      container.removeEventListener('click', toggleMenu);
    };
  }, []);

  return (
    <header>
      <div className="logomenu">
        <Link to="/" className="logo">
          Info Hub
       </Link>
        <div className={`container ${menuClass}`}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </div>
      <ul className={showNav ? 'show_nav' : ''}>
      <li className="nav-link"> 
       <Link to="/">Home</Link>
      </li>
 {!isAuth ? <li className="nav-link"> <Link to="/login">Login</Link> </li> : (
 <>
  <li className="nav-link"> 
     <Link to="/createpost">Create Post</Link>
   </li>
 <button className="button" onClick={signUserOut}>Log out
</button>
 </>
 )
}
      </ul>
    </header>
  );
};

export default Header;
