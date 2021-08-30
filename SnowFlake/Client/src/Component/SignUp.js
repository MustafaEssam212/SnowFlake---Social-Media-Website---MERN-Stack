import {React, useState, useEffect} from 'react';
import Header from './Header'
import '../Styles/SignUp-css.css'
import axios from 'axios';
import {useHistory} from 'react-router-dom'


function SignUp(){
    
    const history = useHistory();

    
    useEffect(()=>{

        const savedToken = localStorage.getItem('Token');
        
        if(savedToken){

            history.push('/Home')
            
        }
    }, [])

    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');
    const [email, setEmail]= useState('');
    const [confirmPass, setconfirmPass]= useState('');
    const [message, setMessage] = useState('');

   

    function handleSubmit(z){
        z.preventDefault();
        const alert = document.getElementById('alert');
        
        if(confirmPass !== password){
            alert.style.display = 'block';
            setMessage("Sorry, Password does not match")
        }else{

            axios.post('http://localhost:5000/api/v1/register', {username, email, password})
            .then(res=>{
                setMessage(res.data.message)
                if(message === 'Email Already Exists'){
                    alert.style.display = 'block';
                }else{
                   
                    alert.classList.remove('alert-danger');
                    alert.classList.add('alert-success');
                    alert.style.display = 'block';
                }
            })
            .catch(err=>console.log(err))
            
        }
        
    }



    return(
        <div>
            <Header />
                   
            <div className="SignupContainer">

                            <div className="text-center">
                                    <h1>Get In Touch</h1>
                                    <h2>With SnowFlake</h2>
                            </div>

                    <div className="secCont">
                                    <div className="form-container">
                                        
                              

                                        <form onSubmit={handleSubmit}>
                                           
                                        

                                          <div id="alert" className="alert alerto alert-danger" role="alert">{message}</div>

                                        <input type="text" className="form-control" placeholder="Username" name="username" onChange={(e)=>{setUsername(e.target.value)}}/>
                                        <input type="email" className="form-control" placeholder="Email" name="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                                        <input type="password" className="form-control" placeholder="Password" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                                        <input type="password" className="form-control" placeholder="Confirm Password" onChange={(e)=>{setconfirmPass(e.target.value)}}/>
                                                <button type="submit" className="btn btn-success btn-lg btn-block">Submit</button>
                                        </form>
                                    </div>
                    </div>

                            
            </div>
       
        </div>
    )
}

export default SignUp;