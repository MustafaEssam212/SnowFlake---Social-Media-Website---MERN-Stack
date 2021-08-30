import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import Header from './Header';
import {Helmet} from 'react-helmet'
import '../Styles/Search.css'
import DefaultProfilePic from '../Images/profilepic.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
import BounceLoader from "react-spinners/ClipLoader";
import Verified from '../Images/verified.png'

function Search(){

    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }
      const query = useQuery();
      var value = query.get('value');
      const [Results, setResults] = useState([]);
      const path = '../Images/Profiles/';
      const [loading, setLoading] = useState(false);
      let [color, setColor] = useState("#3EC2FA");


     

      useEffect(()=>{
        
        setLoading(true);
        axios.post('http://localhost:5000/api/v1/search', {value})
        .then(res=>{
            setResults(res.data)
            setLoading(false)
        })
      }, [value])
  

    return(

        <div>

            <Helmet>

            <title> SnowFlake </title>
            <link href="../css/fontawesome.css" rel="stylesheet" />
            <link href="../css/brands.css" rel="stylesheet" />
            <link href="../css/solid.css" rel="stylesheet" />
            <link rel="icon" href="../icon.png" />

            </Helmet>

            <Header/>
            
            <div className="ResultContent">
            
           
            
                {
                  loading === true ? <div className="Spinner"><BounceLoader color={color} loading={loading} size={70} /></div> :  Results.map((result, key)=>{
                  
                      
                    return <div key={key} className="Result container">

                    <div className="ProfileDiv">
                       {result.avatar === null ?  <img src={DefaultProfilePic} alt="Profle-Picture" className="img-fluid ProfilePic"></img> :  <img src={path + result.avatar} alt="Profle-Picture" className="img-fluid ProfilePic"></img>}
                    </div>
                    <div className="Name">
                        <Link to={`/Profile/${result._id}`}>{result.username} {result.verified === null ? <span></span> : <img src={Verified} alt="Verified" id="verifiedImg" title="Verified"/>}</Link> <br/>
                        <div>
                        <p>Gender: {result.gender}</p>
                        <p>{result.followers.length} Followers</p>
                        </div>
                    </div>
            </div>
                   
                
              })


                }

               

               




            </div>







        </div>
    )
}

export default Search;