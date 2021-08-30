import {React, useState, useContext, useEffect} from 'react';
import '../Styles/LoggedHeader-css.css'
import {NavLink, Link, useHistory} from 'react-router-dom';
import Icon from '../pics/icon.png'
import ProfilePic from '../pics/profilepic.png'
import { AuthContext } from './AuthContext';
import { AccContext } from './Acc-Context';
import { AccDetailsContext } from './AccDetails-Context';
import axios from 'axios';



function LoggedHeader(){

    const history = useHistory();
    const [search, setSearch] = useState(false);
    const originalAuth = useContext(AuthContext);
    const AccInfos = useContext(AccContext);
    const [LoggedHeader, setLoggedHeader] = useState(false);
    const [Ulist, setUlist] = useState(false);
    const[clicked, setClicked] = useState(false);
    const AccDet = useContext(AccDetailsContext);
    const [path, setPath] = useState('');
    const [SearchInput, setSearchInput] = useState('');

    useEffect(()=>{
        const id = AccInfos.Acc._id
        
        if(AccDet.AccDetails.avatar === null){
            axios.post('http://localhost:5000/api/v1/refreshDetails', {id})
            .then(async res=>{
                AccDet.setAccDetails(res.data)
            }) 
        }
    }, [])

    function handlClick(){
        setClicked(!clicked)

    }

   function handleNav(){
    setLoggedHeader(!LoggedHeader);
    setUlist(!Ulist)
    document.getElementById('Ulisst').style.animation = 'UlAnime .5s linear forwards'
   }

    function handleLogout(){
        localStorage.removeItem('Token');
        originalAuth.setAuth({});
        localStorage.removeItem('userInf');
        AccInfos.setAcc({});
        localStorage.clear();
    }

  
   

    function handleTogg(){
        setSearch(!search)
    }


    useEffect(()=>{
      
        setPath("../Images/Profiles/" + AccDet.AccDetails.avatar)
    }, [])

    useEffect(()=>{
      
        setPath("../Images/Profiles/" + AccDet.AccDetails.avatar)
    })


    function handleSearch(x){
        x.preventDefault();
        history.push(`/Search?value=${SearchInput}`)
    }

    

    return(
        
        <div>

            <div className={LoggedHeader === false ? 'DesktopHeader' : 'MobileHeader'}>

                <nav className="LoggedNav">

                    <div className="RightSec">
                        <Link to="/Home"><img src={Icon} className="LoggedIcon" alt="SnowFlake"/></Link>
                        <form onSubmit={handleSearch}>
                            <input type="search" name="search" placeholder="Search" className={search === false ? 'SearchInp' : 'SearchNone'} onChange={(s)=>{setSearchInput(s.target.value)}}/>                    
                    </form>
                   </div>

                   <div className="MiddleSec">

                        <i className="fas fa-search " id="serc" onClick={handleTogg}></i>

                        <i className="fas fa-comment"></i>

                        <i className="fas fa-bell"></i>

                   </div>

                    <ul className={Ulist === false ? 'DesktopUl' : 'MobileUl'} id="Ulisst">

                        

                        <li><Link to={`/Profile/${AccInfos.Acc._id}`}  className="Profile">{AccDet.AccDetails.avatar === null ? <img src={ProfilePic}  alt="Profile" className="profilePic"/> : <img src={path} id="profPic"  alt="Profile" className="profilePic"/> } {AccDet.AccDetails.username}</Link></li>

                        <div className='hr'></div>

                        <div className={Ulist === false ? 'InnerUl' : 'MobileInnerUl'}>
                        <li><NavLink activeClassName="active" to="/Home"><i className="fas fa-home"></i> <span className={Ulist === false ? 'HomeSpan' : 'MobileSpan'}>Home</span></NavLink></li>

                        <div className='hr'></div>

                        <li><NavLink activeClassName="active" to={`/Settings/${AccInfos.Acc._id}`}><i className="fas fa-cog"></i> <span className={Ulist === false ? 'SettingSpan' : 'MobileSpan'}>Settings</span></NavLink></li>

                        <div className='hr'></div>


                        <li><NavLink  activeClassName="active" to="/SignIn" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> <span className={Ulist === false ? 'LogoutSpan' : 'MobileSpan'}>Logout</span></NavLink></li>
                        </div>
                    </ul>



                    <div className="menu-toggle2" onClick={handlClick}>
                      <i className={clicked === false ? "fas fa-bars" : "fas fa-times"} onClick={handleNav} ></i>
                    </div>

                </nav>



            </div>

        </div>

    )
}

export default LoggedHeader;