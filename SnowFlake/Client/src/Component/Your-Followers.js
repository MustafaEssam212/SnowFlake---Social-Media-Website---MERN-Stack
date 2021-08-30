import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Your-Followers.css'
import ProfilePic from '../pics/profilepic.png'
import axios from 'axios';
import { AccContext } from './Acc-Context';
import DefaultProfilePic from '../Images/profilepic.png'
import BounceLoader from "react-spinners/ClipLoader";

function Followers(){

    const AccInfos = useContext(AccContext);
    const [Following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#3EC2FA");


    useEffect(()=>{
        setLoading(true);
        const myId = AccInfos.Acc._id;
        axios.post('http://localhost:5000/api/v1/getcontacts', {myId})
        .then((res) =>{
            const getting =  res.data;
            setFollowing(getting)
            setLoading(false)
        })
    }, [])

    return(
        <div className="FollowersContent">

         <div className="SecondFollowers">
                   <h3>Contacts</h3>

                 {
                     loading === true ? <div className="Spinner2"><BounceLoader color={color} loading={loading} size={70} /></div> :  <div>
                         {
                             Following.length === 0 ? <div className="Allerrt"><p><i className="fas fa-user-plus"></i> Follow Some Accounts</p></div> : <div>
                             {
                            Following.map((item, key)=>{
                                return <div key={key} className="contact">
                                    
                                    <Link to={`/Profile/${item._id}`}>{
                                        item.avatar === null ? <img className="profilePic" src={DefaultProfilePic} alt="Profile"/> : <img className="profilePic" src={`../Images/Profiles/${item.avatar}`} alt="Profile"/>
                                    } {item.username}</Link>
                                </div>
                            })
                        }
                         </div>
                         }
                     </div>

                 }  

                   


    </div>
        </div>
    )
}

export default Followers;