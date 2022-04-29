import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import {FaReddit} from 'react-icons/fa';
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import { useEffect,useState } from "react";

function Header() {

  const [noun] = useState("user_name");
  const [rightBar, setRightBar] = useState(false);

  return (
    <nav className="navbar navbar-expand-md navbar-light" style={{backgroundColor: 'rgb(252, 69, 4)'}}>
        <div className="container-fluid">
            <a className="navbar-brand text-white " href="/">
              <FaReddit/>
              <span className="text-white fw-bold ps-3 pe-5 me-5" >Reddit</span>  
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            {/* <div className="collapse navbar-collapse" id="navbarNavAltMarkup"> */}
            <div className="header__right">

          <div className="header__user">
            <img
              src="https://png.pngtree.com/png-clipart/20190614/original/pngtree-female-avatar-vector-icon-png-image_3725439.jpg"
            />

            <span>User</span>
            <FaIcons.FaChevronDown
            id="downArrow"
            onClick={() => setRightBar(!rightBar)}
            Style={{"color":"rgb(252, 69, 4)"}}
            />
              
          </div>
          <div className="Authorisation">
            <Link to="/login" className="login link" >Log In</Link>
            <Link to="" className="bar" >|</Link>
            <Link to="/signup" className="signup link">Sign up</Link>
          </div>
          </div>
          </div>
          {/* </div> */}
          <div className="mainContent">
        {rightBar ? (
          <div className="rightBar">
            <div className="DropItem" id="logout">
              <p><a href="/login" style={{"text-decoration":"none", "color":"black"}}>Logout</a></p>
            </div>
          </div>
        ) : null}
      </div>

    </nav>   
);
}

export default Header;
