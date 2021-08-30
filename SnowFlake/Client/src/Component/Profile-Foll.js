import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Profile-Foll.css'
import { AccDetailsContext } from './AccDetails-Context';
import { AccContext } from './Acc-Context';

function ProfileFoll(){


    

    const AccDet = useContext(AccDetailsContext);
    const AccInfos = useContext(AccContext);
    return(
        <div className="ProfileFoll">
         
            <ul>
                <li><Link to={`/Followers/${AccInfos.Acc._id}`}>{AccDet.AccDetails.followers.length} Followers</Link></li>
                <li><Link to={`/Following/${AccInfos.Acc._id}`}>{AccDet.AccDetails.following.length} Following</Link></li>
            </ul>

            

        </div>
    )
}

export default ProfileFoll;