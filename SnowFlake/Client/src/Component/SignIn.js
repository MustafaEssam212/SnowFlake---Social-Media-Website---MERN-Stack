
import {React, useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import '../Styles/SignIn-css.css'
import Header from './Header'
import whiteIcon from '../pics/whiteicon.png'
import axios from 'axios';
import {AuthContext} from './AuthContext'
import { AccContext } from './Acc-Context';



function SignIn(){

    const history = useHistory();
    const AccInfos = useContext(AccContext);

    useEffect(()=>{
        const savedToken = localStorage.getItem('Token');
        
        if(savedToken){
            history.push('/Home')
        }
    }, [])




   
      
        const [email, setEmail]= useState('');
        const [password, setPassword]= useState('');
        const [info, setInfo] = useState ('');
        const [token, setToken] = useState({});
        const originalAuth = useContext(AuthContext);

     

  function handleLogin(e) {

      e.preventDefault();

        const alert = document.getElementById('newAlert');

        if(email === '' || password === ''){
            alert.style.display = 'block';
            alert.innerHTML = 'Please Enter a Vaild Email/Password';    
        }else{
                axios.post('http://localhost:5000/api/v1/auth', {email, password})
                .then(res=>{
                  
                  

                        if( res.data.message){

                            setInfo(res.data.message)
                            alert.style.display = 'block';

                        } else{
                         setToken(res.data.token);
                         localStorage.setItem('Token', token);
                         originalAuth.setAuth({token, email});
                         AccInfos.setAcc(res.data.user)
                         history.push('/Home')
                         console.log(res.data.user)
                        }

                     
                           
                           
                           
                       
                })

                
               
        }
        
    } 


    return(
        <div>
            <Header />
            
                    <div className="SignInContainer">
                                    
                                <div className="topHead">

                                        <img src={whiteIcon} alt="Icon" className="whiteIcone"/>

                                        <h1>Welcome to SnowFlake</h1>
                                </div>

                        <div className="f-cont">

                            <div className="form-container2">

                                <form onSubmit={handleLogin}>



                                     <div id="newAlert" className="alert alert-danger alerta" role="alert">
                                            {info}
                                        </div>

                                        <input type="email" className="form-control" placeholder="Email" name="email" onChange={(e)=>{setEmail(e.target.value)}}/>

                                        <input type="password" className="form-control" placeholder="Password" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>


                                          

                                            <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>  
                                </form>

                            </div>
                            
                        </div>


                    </div>
        </div>
    )
}


export default SignIn;