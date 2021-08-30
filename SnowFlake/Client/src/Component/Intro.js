import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../Styles/intro-css.css'
import icon from '../pics/icon.png'
import headericon from '../pics/headericon.png'
import social from '../pics/social.png'
import whiteIcon from '../pics/whiteicon.png'
import {useHistory} from 'react-router-dom'

function Intro(){

    
    const history = useHistory();
    
    useEffect(()=>{

        const savedToken = localStorage.getItem('Token');
        
        if(savedToken){

            history.push('/Home')
            
        }
    }, [])


    const [style1, setStyle] = useState({
        'display': 'none'
    })
    const [style2, setStyle2] = useState({
        'display': 'none'
    })

    const [headerStyle, setHeaderStyle]= useState({
        'display': 'none'
    })

    const [contentStyle, setConetentStyle]= useState({
        'visibility': 'hidden'
    })


     setTimeout(() => {
       setStyle({
           'display' : 'block',
           'animation': 'sideAnime1 1s linear forwards',
           'WebkitAnimation' : 'sideAnime1 1s linear forwards' 
      
    })
    }, 5000);

    setTimeout(() => {
        setStyle2({
            'display' : 'block',
            'animation': 'sideAnime2 1s linear forwards',
            'WebkitAnimation' : 'sideAnime2 1s linear forwards' 
       
     }) 
     }, 5000);

      setTimeout(() => {
        if(style1.display === 'block'){
            setHeaderStyle({
                'display' : 'block',
                'animation': 'headerAnime 1s linear forwards',
            'WebkitAnimation' : 'headerAnime 1s linear forwards' 
            })
        }
    }, 1000); 

    setTimeout(() => {
        if(style1.display === 'block'){
            setConetentStyle({
                'visibility' : 'visible',
                'animation': 'headerAnime 1s linear forwards',
            'WebkitAnimation' : 'headerAnime 1s linear forwards' 
            
            })
        }
    }, 1000); 

    return(
        <div className="introParent">
                        <div className="center">
                            <img src={icon} className="imageIcon" alt="Loading"></img>
                        </div>


                        <header style={headerStyle} className="introHeader">
                            <Link to="/"><img src={headericon} className="headerIcon" alt="SnowFlake"/></Link>

                        
                        </header>


                <div className="containerAnime">

                            <div style={style2}  className="leftSide">
                                
                            </div>

                            <div style={style1} className="rigthSide">
                                
                            </div>  

                   
                 <div style={contentStyle} className="contentDiv">
                
                        <div className="divOne">
                        
                             <p className="introPar"><img src={whiteIcon} alt="Icon" className="whiteIcon"/> Join SnowFlake Today</p>

                             <br/>

                            <div className="Btns">
                                    <Link to="/SignUp">Sign Up</Link>
                                    <Link to="/SignIn">Sign In</Link>
                            </div>    

                        </div>
                     
                        <div className="divTwo">

                             <img src={social} className="socialImage" alt="SnowFlake"/>

                        </div>
            
                    </div>
                    
                     
                </div>
                
        </div>
        
    )
}

export default Intro;