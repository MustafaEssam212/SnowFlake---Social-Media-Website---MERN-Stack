
import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import headericon from '../pics/headericon.png'
import '../Styles/header-css.css'
import { AuthContext} from './AuthContext'
import LoggedHeader from './Logged-Header';


function Header(){

    const[clicked, setClicked] = useState(false);
    const [mobileHeader, setmobileHeader] = useState(false);
    const [Ul, setUl] = useState(false);
    const originalAuth = useContext(AuthContext);


   function handleClick(){
        setClicked(!clicked)
    }


     function  navClicked(){
         setmobileHeader(!mobileHeader);
         setUl(!Ul);
         document.getElementById('UlOne').style.animation = 'UlAnime .5s linear forwards'
    }


    
    return(

        originalAuth.auth.token ? <LoggedHeader />

                          : <div className={mobileHeader === false ? 'headerContent' : 'mobile-header'}>

        <nav className="firstNav">
        <Link to="/"><img src={headericon} className="headerIcon2" alt="SnowFlake"/></Link>

            <div className="firstUl-Div">
                    <ul className={Ul === false ? 'firstUl' : 'newUl'} id="UlOne">

                            <li><Link to="/SignUp">Sign Up</Link></li>
                            <li><Link to="/SignIn">Sign In</Link></li>

                    </ul>        
            </div>

                    <div className="menu-toggle" onClick={handleClick}>
                      <i className={clicked === false ? "fas fa-bars" : "fas fa-times"} onClick={navClicked}></i>
                    </div>
        </nav>

    </div>
        
        
        
    )
}

export default Header;