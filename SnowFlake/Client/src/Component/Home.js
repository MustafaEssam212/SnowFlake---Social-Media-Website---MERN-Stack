import React, {useEffect, useState, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import Header from './Header';
import Followers from './Your-Followers';
import {Helmet} from 'react-helmet'
import GeneralPosts from './GeneralPosts'
import '../Styles/Home-css.css'

function Home(){    

    const history = useHistory();

    useEffect(()=>{

        const savedToken = localStorage.getItem('Token');
        
        if(!savedToken){

            history.push('/')
            return;
        }   

     
    }, [])



    
  
 
  
    return(
        <div>

                <Helmet>

                <title> {'SnowFlake'} </title>
            <link href="../css/fontawesome.css" rel="stylesheet" />
            <link href="../css/brands.css" rel="stylesheet" />
            <link href="../css/solid.css" rel="stylesheet" />
            <link rel="icon" href="../icon.png" />

                </Helmet>



               <Header />
          
          <div className='HomeContent'>
              <div>
                <Followers  className="MyContacts"/>
                </div>
                <div>
                <GeneralPosts className="MyPosts"/>
                </div>
                <i className={window.innerWidth > 890 ? "NoConta" : "fas fa-comment-dots conta"}></i>
          </div>

        </div>
    )
}




export default Home;