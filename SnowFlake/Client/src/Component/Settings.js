import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Header from './Header';
import {Helmet} from 'react-helmet'
import '../Styles/Settings.css'
import { AccDetailsContext } from './AccDetails-Context';
import axios from 'axios';


function Settings(){

    const params = useParams();
    const AccDet = useContext(AccDetailsContext);

    // Name Consts
    const [DivHidden, setDivHidden] = useState(false);
    const [ShowForm, setShowForm] = useState(false);

    // Email Consts
    const [EmailDivHidden, setEmailDivHidden] = useState(false);
    const [EmialShowForm, setEmialShowForm] = useState(false);

    // Bio Consts
    const [BioDivHidden, setBioDivHidden] = useState(false);
    const [BioShowForm, setBioShowForm] = useState(false);

    // Studing Consts
    const [StudingDivHidden, setStudingDivHidden] = useState(false);
    const [StudingShowForm, setStudingShowForm] = useState(false);


    //Living Consts
    const [LivingDivHidden, setLivingDivHidden] = useState(false);
    const [LivingShowForm, setLivingShowForm] = useState(false);

     //Relationship Consts
     const [RelationDivHidden, setRelationDivHidden] = useState(false);
     const [RelationShowForm, setRelationShowForm] = useState(false);

    //Job Consts
    const [JobDivHidden, setJobDivHidden] = useState(false);
    const [JobShowForm, setJobShowForm] = useState(false);

    //Gender Consts
    const [GenderDivHidden, setGenderDivHidden] = useState(false);
    const [GenderShowForm, setGenderShowForm] = useState(false);


    // Information Data
    const [NewName, setNewName] = useState('');
    const [NewEmail, setNewEmail] = useState('');
    const [NewBio, setNewBio] = useState('');
    const [NewStuding, setNewStuding] = useState('');
    const [NewLiving, setNewLiving] = useState('');
    const [NewRelation, setNewRelation]= useState('');
    const [NewJob, setNewJob] = useState('');
    const [NewGender, setNewGender] = useState('');

    useEffect(()=>{
        axios.post('http://localhost:5000/api/v1/refreshDetails', params)
        .then( res=>{
            AccDet.setAccDetails(res.data)
        })   
       
    }, [])


    function handleNewName(z){
        z.preventDefault();
        setDivHidden(false)
        setShowForm(false)
        axios.post('http://localhost:5000/api/v1/updateusername' , {params, NewName})
        window.location.reload();
    }

    function handleNewEmail(x){


        if(NewEmail.includes('@')){
            x.preventDefault();
            setEmailDivHidden(false)
            setEmialShowForm(false)
            axios.post('http://localhost:5000/api/v1/updateuseremail' , {params, NewEmail})
            .then(res=>{
                if(res.data.message){
                    window.location.reload();
                }else{
                    return;
                }
            })
        }else{
            console.log('i caaaaant')
        }

        
        
    }

    function handleNewBio(b){
        b.preventDefault();
        setBioDivHidden(false)
        setBioShowForm(false)
        axios.post('http://localhost:5000/api/v1/updateuserbio' , {params, NewBio})
        window.location.reload();
    }

    function handleNewStuding(f){
        f.preventDefault();
        setStudingDivHidden(false)
        setStudingShowForm(false)
        axios.post('http://localhost:5000/api/v1/updateuserstuding' , {params, NewStuding})
        window.location.reload();
    }



    function handleNewLiving(s){
        s.preventDefault();
        setLivingDivHidden(false)
        setLivingShowForm(false)
        axios.post('http://localhost:5000/api/v1/updateuserliving' , {params, NewLiving})
        window.location.reload();
    }

    function handleNewRelation(y){
        y.preventDefault();
       const Select = document.getElementById('selection');
       setNewRelation(Select.value);
       axios.post('http://localhost:5000/api/v1/updateuserrelation', {params, NewRelation})
       if(NewRelation !== ''){
        setRelationDivHidden(false)
        setRelationShowForm(false)
        window.location.reload();
       }
    }

    function handleNewJob(i){
        i.preventDefault();
        setJobDivHidden(false)
        setJobShowForm(false)
        axios.post('http://localhost:5000/api/v1/updateuserjob' , {params, NewJob})
        window.location.reload();
    }
    
    function handleNewGender(u){
        u.preventDefault();
       const Select = document.getElementById('genderS');
       setNewGender(Select.value);
       axios.post('http://localhost:5000/api/v1/updateusergender', {params, NewGender})
       if(NewGender !== ''){
        setGenderDivHidden(false)
        setGenderShowForm(false)
        window.location.reload();
       }
    }
    return(

        <div>

                <Helmet>

                <title>  Settings | SnowFlake </title>
                <link href="../css/fontawesome.css" rel="stylesheet" />
                <link href="../css/brands.css" rel="stylesheet" />
                <link href="../css/solid.css" rel="stylesheet" />
                <link rel="icon" href="../icon.png" />

                </Helmet>

            <Header />


            <div className="SettingsContent">

                <div className="General">

                    <h3>General Account Settings</h3>
                    <hr className="BlackHr"></hr>
                    

                    <div className="form">
                        <div className={DivHidden === false ? 'formDiv' : 'DivHid'}>
                            <p>Name: <span>{AccDet.AccDetails.username}</span></p>
                            <button type="button" className="btn btn-link" onClick={
                                ()=>{setDivHidden(true)
                                    setShowForm(true)
                            }}><i className="fas fa-pencil-alt"></i> Edit</button>
                        </div>

                        <div className={ShowForm === false ? 'HiddinForm' : 'EditArea'}>
                            <form>
                                <div className="Editing">
                                <label>New Name: </label>
                                 <input type="text" className="form-control" onChange={(e)=>{setNewName(e.target.value)}}></input>
                                </div>
                               
                               <button className="btn btn-primary" onClick={handleNewName}>Save</button>
                            </form>
                        </div>
                            <hr></hr>
                    </div>

                
                



                    <div className="form">
                        <div className={EmailDivHidden === false ? 'formDiv' : 'DivHid'}>
                            <p>Email: <span>{AccDet.AccDetails.email}</span></p>
                            <button type="button" className="btn btn-link" onClick={
                                ()=>{setEmailDivHidden(true)
                                    setEmialShowForm(true)
                            }}><i className="fas fa-pencil-alt"></i> Edit</button>
                        </div>

                        <div className={EmialShowForm === false ? 'HiddinForm' : 'EditArea'}>
                            <form>
                                <div className="Editing">
                                <label>New Name: </label>
                                 <input type="email" className="form-control" onChange={(q)=>{setNewEmail(q.target.value)}}></input>
                                </div>
                               
                               <button className="btn btn-primary" onClick={handleNewEmail}>Save</button>
                            </form>
                        </div>
                            <hr></hr>
                    </div>



                    <div className="form">
                        <div className={GenderDivHidden === false ? 'formDiv' : 'DivHid'}>
                            <p>Gender: <span>{AccDet.AccDetails.gender}</span></p>
                            <button type="button" className="btn btn-link" onClick={
                                ()=>{setGenderDivHidden(true)
                                    setGenderShowForm(true)
                            }}><i className="fas fa-pencil-alt"></i> Edit</button>
                        </div>

                        <div className={GenderShowForm === false ? 'HiddinForm' : 'EditArea'}>
                            <form>
                                <div className="Editing">
                                <label>Gender: </label>
                                <select name="gender" id="genderS" className="form-select">
                                    <option selected>Open this select menu</option>
                                    <option value="Male" >Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Another">Another</option>
                                    
                                </select>
                              
                                </div>
                               
                               <button className="btn btn-primary" onClick={handleNewGender}>Save</button>
                            </form>
                            
                        </div>
                            <hr></hr>
                    </div>
                    


                </div>

            </div>

            <div className="UserInformationSettings">

                    <h3>Edit Account Information</h3>
                    <hr className="BlackHr"></hr>


                    <div className="form">
                        <div className={BioDivHidden === false ? 'formDiv' : 'DivHid'}>
                            <p>Bio: <span>{AccDet.AccDetails.bio}</span></p>
                            <button type="button" className="btn btn-link" onClick={
                                ()=>{setBioDivHidden(true)
                                    setBioShowForm(true)
                            }}><i className="fas fa-pencil-alt"></i> Edit</button>
                        </div>

                        <div className={BioShowForm === false ? 'HiddinForm' : 'EditArea'}>
                            <form>
                                <div className="Editing">
                                <label>Bio: </label>
                                 <input type="text" maxLength='50' className="form-control" onChange={(w)=>{setNewBio(w.target.value)}}></input>
                                 <p>Maximum 50 Char <span id="lenght">{NewBio.length}/50</span></p>
                                </div>
                               
                               <button className="btn btn-primary" onClick={handleNewBio}>Save</button>
                            </form>
                        </div>
                            <hr></hr>
                    </div>


                    <div className="form">
                        <div className={StudingDivHidden === false ? 'formDiv' : 'DivHid'}>
                            <p>Study at: <span>{AccDet.AccDetails.studing}</span></p>
                            <button type="button" className="btn btn-link" onClick={
                                ()=>{setStudingDivHidden(true)
                                    setStudingShowForm(true)
                            }}><i className="fas fa-pencil-alt"></i> Edit</button>
                        </div>

                        <div className={StudingShowForm === false ? 'HiddinForm' : 'EditArea'}>
                            <form>
                                <div className="Editing">
                                <label>Bio: </label>
                                 <input type="text" maxLength='30' className="form-control" onChange={(g)=>{setNewStuding(g.target.value)}}></input>
                                 <p>Maximum 30 Char <span id="lenght">{NewStuding.length}/30</span></p>
                                </div>
                               
                               <button className="btn btn-primary" onClick={handleNewStuding}>Save</button>
                            </form>
                        </div>
                            <hr></hr>
                    </div>


                    <div className="form">
                        <div className={LivingDivHidden === false ? 'formDiv' : 'DivHid'}>
                            <p>Lives in: <span>{AccDet.AccDetails.living}</span></p>
                            <button type="button" className="btn btn-link" onClick={
                                ()=>{setLivingDivHidden(true)
                                    setLivingShowForm(true)
                            }}><i className="fas fa-pencil-alt"></i> Edit</button>
                        </div>

                        <div className={LivingShowForm === false ? 'HiddinForm' : 'EditArea'}>
                            <form>
                                <div className="Editing">
                                <label>Lives in: </label>
                                 <input type="text"  className="form-control" onChange={(h)=>{setNewLiving(h.target.value)}}></input>
                              
                                </div>
                               
                               <button className="btn btn-primary" onClick={handleNewLiving}>Save</button>
                            </form>
                            
                        </div>
                            <hr></hr>
                    </div>



                    <div className="form">
                        <div className={RelationDivHidden === false ? 'formDiv' : 'DivHid'}>
                            <p>Relationship: <span>{AccDet.AccDetails.relationship}</span></p>
                            <button type="button" className="btn btn-link" onClick={
                                ()=>{setRelationDivHidden(true)
                                    setRelationShowForm(true)
                            }}><i className="fas fa-pencil-alt"></i> Edit</button>
                        </div>

                        <div className={RelationShowForm === false ? 'HiddinForm' : 'EditArea'}>
                            <form>
                                <div className="Editing">
                                <label>Relationship: </label>
                                <select name="relationship" id="selection" className="form-select">
                                    <option selected>Open this select menu</option>
                                    <option value="Single" >Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Engaged">Engaged</option>
                                   
                                </select>
                              
                                </div>
                               
                               <button className="btn btn-primary" onClick={handleNewRelation}>Save</button>
                            </form>
                            
                        </div>
                            <hr></hr>
                    </div>


                    <div className="form">
                        <div className={JobDivHidden === false ? 'formDiv' : 'DivHid'}>
                            <p>Job: <span>{AccDet.AccDetails.job}</span></p>
                            <button type="button" className="btn btn-link" onClick={
                                ()=>{setJobDivHidden(true)
                                    setJobShowForm(true)
                            }}><i className="fas fa-pencil-alt"></i> Edit</button>
                        </div>

                        <div className={JobShowForm === false ? 'HiddinForm' : 'EditArea'}>
                            <form>
                                <div className="Editing">
                                <label>Job: </label>
                                 <input type="text"  className="form-control" onChange={(l)=>{setNewJob(l.target.value)}}></input>
                              
                                </div>
                               
                               <button className="btn btn-primary" onClick={handleNewJob}>Save</button>
                            </form>
                            
                        </div>
                            <hr></hr>
                    </div>

            </div>

        </div>
    )
}

export default Settings;