import axios from 'axios';
import React, { useEffect, useState, useContext} from 'react';
import { useParams, useHistory } from 'react-router';
import { AccContext } from './Acc-Context';
import { AccDetailsContext } from './AccDetails-Context';
import { Link } from 'react-router-dom';
import Header from './Header';
import cover from '../Images/cover.png';
import '../Styles/Profile.css';
import Modal from 'react-modal';
import {Helmet} from "react-helmet";
import ProfileFoll from './Profile-Foll';
import DefaultProfilePic from '../Images/profilepic.png'
import Verified from '../Images/verified.png'
import AnotherProfile from './AnotherProfile';
import Heart from "react-animated-heart";


function Profile(){

    // Get Data
    const AccInfos = useContext(AccContext);
    const AccDetails = useContext(AccDetailsContext);
    const history = useHistory();
    const params = useParams();
    const [Id, setId] = useState('');
    const [AnotherPerson, setAnotherPerson] = useState('');

    // Change Profile Picture Data
    const [ProfilePic, setProfilePic] = useState('');
    const [ModalOpen, setModalOpen] = useState(false);
    const [Chosen, setChosen] = useState(null);
    const CustomModal ={
        content:{
            border : 'none',
            boxShadow: '0 0 10px 2px gray',
           
        }
    }

    var PostCustomModal ={
        content:{
            border : 'none',
            boxShadow: '0 0 10px 2px gray',
            width: '500px',
            display: 'block',
            margin: 'auto',
            height: '450px',
            
        }
    }

    const [PostSelection, setPostSelection] = useState(false);
    const [PostId, setPostId] = useState('');
    const [SecondPostId, setSecondPostId] = useState('');


    // Change Profile Pic Data
    const [path, setPath] = useState('');
    const [Im, setImg] = useState('');

    // Change Cover Picture Data
    const [Cover, setCover] = useState('');
    const [CoverUrl, setCoverUrl] = useState('');
    const [CoverModalOpen, setCoverModalOpen] = useState(false);
    const [CoverPath, setCoverPath] = useState('');

    // Post Data
    const [Text, setText] = useState('');
    const [PostImage, setPostImage] = useState('');
    const [PostModalOpen, setPostModalOpen] = useState(false);

    // Posts Data
    const [PersonalPosts, setPersonalPosts] = useState([]);
    const [isClick, setClick] = useState(false);    
    const [LikedPost, setLikedPost] = useState('');
    const [SavedLiked, setSavedLiked] = useState([]);
   
    const PostImageUrl = '../Images/Posts/';


    // Comments Data
    const [ShowComments, setShowComments] = useState(false);
    const [ThisCommentPost, setThisCommentPost] = useState('');
    const [CommentText, setCommentText] = useState('');
    const [Comments, setComments] = useState([]);
    const [CommentsList, setCommentsList] = useState([]);
    // Lifecycles

    useEffect(()=>{
         setId(params.id)
    }, [])

  useEffect(()=>{
    const Author =  Id.id;
    const myId = params.id;
    axios.post('http://localhost:5000/api/p1/getpersonalposts', {Author})
    .then(res =>{
        setPersonalPosts(res.data)
    }
    )
    axios.post('http://localhost:5000/api/p1/checklikes', {myId})
    .then(res=>{
        
        setSavedLiked(res.data.postslike)
       
    })
    
  }, [Id])

  
 
   

    useEffect(()=>{
        if(Id.id === AccInfos.Acc._id){
            axios.post('http://localhost:5000/api/v1/refreshDetails', params)
            .then( res=>{
                AccDetails.setAccDetails(res.data)
            }) 
            axios.post('http://localhost:5000/api/v1/refresh', params)
            .then(async res=>{
                setImg(res.data.avatar);
                setCoverUrl(res.data.cover) 
            
            })   
        }else{
            setAnotherPerson(Id.id)
        }
    }, [Id])

 

    useEffect(()=>{
        setPath("../Images/Profiles/" + Im)
    }, [Im])

    
    useEffect(()=>{
        setCoverPath("../Images/Covers/" + CoverUrl)
    }, [CoverUrl])

 
    useEffect(()=>{
        setId(params)
    }, [params])
    
   
    // Profile Functions
    function changeFile(z){
        setProfilePic(z.target.files[0]);
        
        const reader = new FileReader();
        reader.onload = () =>{
            if(reader.readyState === 2){
                setChosen(reader.result)
            }
        }
        if(z.target.files[0]){
            reader.readAsDataURL(z.target.files[0]);
          }
    }



    function ChangeProfilePic(e){
        e.preventDefault();

        const data = new FormData();
        data.append('prof' , ProfilePic)
        data.append('id', Id.id)
           axios.post('http://localhost:5000/api/v1/uploadProfilePic', data, params)
           .then(res=>{
            setModalOpen(false)
            history.push(`/Profile/${AccInfos.Acc._id}`)
        })
           
    }

    // Cover Functions

    function changeCoverFile(a){
        setCover(a.target.files[0]);
        
        const reader = new FileReader();
        reader.onload = () =>{
            if(reader.readyState === 2){
                setChosen(reader.result)
            }
        }
        if(a.target.files[0]){
            reader.readAsDataURL(a.target.files[0]);
          }
    }


    function ChangeCoverPic(s){
        s.preventDefault();

        const coverData = new FormData();
        coverData.append('cover' , Cover)
        coverData.append('id', Id.id)
        axios.post('http://localhost:5000/api/v1/uploadcover', coverData, params)
        .then(res=>{
            setCoverModalOpen(false)
            history.push(`/Profile/${AccInfos.Acc._id}`)
        })
           
    }

    // Post Functions
    function changePostFile(f){
        setPostImage(f.target.files[0]);
        
        const reader = new FileReader();
        reader.onload = () =>{
            if(reader.readyState === 2){
                setChosen(reader.result)
            }
        }
        if(f.target.files[0]){
            reader.readAsDataURL(f.target.files[0]);
          }
    }


    function handlePostSubmit(k){
        k.preventDefault();
        const PostData = new FormData();
        PostData.append('PostImage', PostImage)
        PostData.append('Text', Text)
        PostData.append('Author', Id.id)

        axios.post('http://localhost:5000/api/p1/createpost', PostData)    
        .then(res =>{
            if(res.data.message){
                    setPostModalOpen(false)
                    history.push(`/Profile/${AccInfos.Acc._id}`)
                    
            }
           
        })
        
      
    }


    function RemovePost(s){
        s.preventDefault();   
        axios.post('http://localhost:5000/api/p1/deletepost', {PostId})
        .then( res=>{
            if(res.data.message){
                history.push(`/Profile/${AccInfos.Acc._id}`)
               
            }
  
        })
      
    }

    function handleComment(s){
        s.preventDefault();
        const myId = params.id;
        
        axios.post('http://localhost:5000/api/p1/comment', {myId, ThisCommentPost, CommentText})
        .then(res =>{
            const PostComment = ThisCommentPost;
            history.push(`/Profile/${params.id}`)
            document.getElementById('Inpuu').value = '';
            axios.post('http://localhost:5000/api/p1/getcomments', {PostComment})
                    .then(res =>{
                        setComments(res.data)
                        
                })
        })
    }

  
    const mapFunc = PersonalPosts.map( (item, key)=>{
                              
            return  <div key={key} className="Posts" id={item._id}>

          
            <div className="PostsHeader" >
                <div>
                {
                    AccDetails.AccDetails.avatar === null ? <img src={DefaultProfilePic} alt="Profile" className="PostsHeaderImg" title={AccDetails.AccDetails.username} /> : <img src={path} alt="Profile" className="PostsHeaderImg" title={AccDetails.AccDetails.username} />
                } <p>{AccDetails.AccDetails.username}</p><p id="Daate" className="Date">{item.date}</p>
                </div>

                <div onClick={()=>{
                    setPostId(item._id)
                    setPostSelection(!PostSelection);
                    setSecondPostId(key);     
                }}><i className="fas fa-chevron-down PostHeaderI"></i></div>
                    
                <div className={PostSelection && key === SecondPostId ? 'PostsSelections' : 'NoSelection' } >
                    <button className="btn btn-danger" onClick={RemovePost}><i className="fas fa-trash"></i> Delete Post</button>
                    <button className="btn btn-success"><i className="fas fa-thumbtack"></i> Pin Post</button>
                    
                </div>
                
            </div>

            <div className="PostContent">
                    <p>{item.text}</p>
                    {item.photo ? <div className="text-center PostImgContainer">
                    <img src={PostImageUrl + item.photo} alt="Image"/>
                    </div> : <span className="NoSpan"></span>}
            </div>


            <div className="PostInformation">
                <div className="Likes">
                    <p>{item.likes.length} Likes</p>
                </div>
                <div onClick={async()=>{
                    const PostComment = await item._id;
                    setShowComments(true)
                    setThisCommentPost(item._id)
                    setCommentText('');
                    axios.post('http://localhost:5000/api/p1/getcomments', {PostComment})
                    .then(res =>{
                        setComments(res.data)
                       
                    })
                }} className="PostComments">
                    <p>{item.comments.length} Comments</p>
                </div>
                
            </div>

            <hr></hr>

            <div className="PostBtns2">
                <div id={key} onClick={async()=>{
                    const PostId0 = await item._id;
                    setClick(!isClick)
                    setLikedPost(item._id)
                   
                    const myId = await params.id;
                    
                    axios.post('http://localhost:5000/api/p1/like', {PostId0, myId})
                    .then(res=>{
                   console.log(res.data)
                   history.push(`/Profile/${AccInfos.Acc._id}`)
                    })
                   
               
                }} className={isClick === true && LikedPost === item._id || SavedLiked.find(element => element === item._id) ? 'Liked' : 'Like'}><i className="fas fa-heart"></i> Like</div>
                <div onClick={async ()=>{
                     const PostComment = await item._id;
                    setThisCommentPost(item._id)
                    
                    setShowComments(true)
                    setCommentText('');
                    axios.post('http://localhost:5000/api/p1/getcomments', {PostComment})
                    .then(res =>{
                        setComments(res.data)
                       
                    })
                }} className="Comment"><i className="fas fa-comment"></i> Comment</div>
                <div className="Share"><i className="fas fa-share"></i> Share</div>
                
            </div>
                
            
            <div className={ShowComments === true && ThisCommentPost === item._id ? 'WriteComment' : 'NoComments'}>
                <div className="commin">
                    <form onSubmit={handleComment}>
                <input className="writecomm form-control" id="Inpuu" onChange={(s)=>setCommentText(s.target.value)} type="text" placeholder="Write a Comment"></input>
                </form>
                </div>

                <div className="existsComments">
                   

                    {
                        Comments.map((item, key)=>{
                            return <div className="userComm">
                                      <img src={`../Images/Profiles/${item.avatar}`} alt="Profile" title="Profile" className="userCommPic"></img>
                                      <div className="CommInfor">
                                          <div>
                                        <Link to={`/Profile/${item._id}`}>{item.username}</Link>
                                        </div>
                                        <p>{item.commenttext}</p>
                                      </div>
                            </div>
                        })
                    }

                </div>
            </div>    




        </div>

               


           

        })
 

    return(


        // If this the same account which is logged

        <div> 

            
        <Helmet>

            <title> {AccInfos.Acc.username + ' | SnowFlake'} </title>
            <link href="../css/fontawesome.css" rel="stylesheet" />
            <link href="../css/brands.css" rel="stylesheet" />
            <link href="../css/solid.css" rel="stylesheet" />
            <link rel="icon" href="../icon.png" />

        </Helmet>




            <Header />
          
        
            {
                Id.id === AccInfos.Acc._id ? <div>      <div className="Cover-Profile">

                <div className="cover">

                    {AccDetails.AccDetails.cover === null ? <img src={cover} className="img-fluid" alt="Cover-Pic"></img > : <img className="img-fluid" alt="Cover-Pic" src={CoverPath}></img>}

                    <div className="UploadCovLabel">

                        

                    <label className="UploadCov-label" onClick={()=>{setCoverModalOpen(true)}}>
                         
                         <i className="fas fa-camera"></i> <span>Upload Cover</span>
                         
                    </label>


                    <Modal isOpen={CoverModalOpen} style={CustomModal}>
                    <i className="fas fa-times-circle" onClick={()=>setCoverModalOpen(false)}></i>                    
                        <h2>Upload Cover Picture</h2>
                        <hr></hr>


                        <div className="text-center ChosenImage">
                          <img src={Chosen} className={Chosen === null ? 'NoImage' : 'PreImage img-fluid'} alt="Preview Image"/>  
                          </div>


                        <div className="text-center buttonsss" >
                        <button type="button" onClick={()=>{setChosen(null)}} className={Chosen === null ? 'NoImage' : 'btn btn-danger removeImage'}>Remove Selected Image</button>

                            <form encType='multipart/form-data' onSubmit={ChangeCoverPic}>
                                <label onClick={()=>{setChosen(null)}}>
                                    <input className="Upload-input" type="file" accept="image/png, image/jpg, image/jpeg" filename="cover" onChange={changeCoverFile}></input>
                                    <i className="fa fa-plus-square"></i>
                                </label>
                                
                                <button type="submit" className={Chosen === null ? 'NoImage' : 'btn btn-primary'}>Save as Profile Picture</button>
                            </form>
                        </div>
                        
                    </Modal>

                    </div>

                </div>  

                <div className="profile">

                    <div className="profile-image text-center">
                        

                         {AccDetails.AccDetails.avatar === null ? <img src={DefaultProfilePic}  alt="Profile" className="img-fluid"/> : <img src={path} id="profPic"  alt="Profile" className="img-fluid"/> }
                       

                    <div className="UploadPic">

                    <label className="Upload-label" onClick={()=>{setModalOpen(true)}}>
                         
                            <i className="fas fa-camera"></i>
                            
                    </label>

                    <p className="userName">{AccDetails.AccDetails.username} {AccDetails.AccDetails.verified === null ? <span></span> : <img src={Verified} id="verifiedImg" title="Verified" alt="Verified"/>}</p>
                    <p className="Bio">{AccDetails.AccDetails.bio} <Link to={`/Settings/${AccInfos.Acc._id}`}> Edit</Link></p>
                    <ProfileFoll className="ProfileFoll"/>  
                   
                    <Modal isOpen={ModalOpen} style={CustomModal}>
                    <i className="fas fa-times-circle" onClick={()=>setModalOpen(false)}></i>                    
                        <h2>Upload Profile Picture</h2>
                        <hr></hr>


                        <div className="text-center ChosenImage">
                          <img src={Chosen} className={Chosen === null ? 'NoImage' : 'PreImage img-fluid'} alt="Preview Image"/>  
                          </div>


                        <div className="text-center buttonsss" >
                        <button type="button" onClick={()=>{setChosen(null)}} className={Chosen === null ? 'NoImage' : 'btn btn-danger removeImage'}>Remove Selected Image</button>

                            <form encType='multipart/form-data' onSubmit={ChangeProfilePic}>
                                <label onClick={()=>{setChosen(null)}}>
                                    <input className="Upload-input" type="file" accept="image/png, image/jpg, image/jpeg" filename="ProfilePic" onChange={changeFile}></input>
                                    <i className="fa fa-plus-square"></i>
                                </label>
                                
                                <button type="submit" className={Chosen === null ? 'NoImage' : 'btn btn-primary'}>Save as Profile Picture</button>
                            </form>
                        </div>
                        
                    </Modal>
                        
               </div>
                    </div>

                </div>

           

           </div>


            <div className="Information-Posts">
               

                    <div className="UserInfromation">

                        <h5>Intro</h5>
                        <p><i className="fas fa-transgender"></i> Gender: <span>{AccDetails.AccDetails.gender}</span></p>
                        <p><i className="fas fa-graduation-cap"></i> Study at: <span>{AccDetails.AccDetails.studing}</span></p>
                        <p><i className="fas fa-home"></i> Lives in: <span>{AccDetails.AccDetails.living}</span></p>
                        <p><i className="fas fa-heart"></i> Relationship: <span>{AccDetails.AccDetails.relationship}</span></p>
                        <p><i className="fas fa-briefcase"></i> Current job: <span>{AccDetails.AccDetails.job}</span></p>
                        

                        <div className='text-center EditDetailsBtn'>
                        <Link className="btn btn-primary btn-lg btn-block" to={`/Settings/${AccInfos.Acc._id}`}> Edit details</Link>
                        </div>
                    </div>

                    <div className="UserPosts">

                        <div className="Post">
                            <div className="Sec1">
                                {
                                    AccDetails.AccDetails.avatar === null ? <img src={DefaultProfilePic} alt="Profile" title={AccDetails.AccDetails.username}></img>  : <img src={path} alt="Profile" title={AccDetails.AccDetails.username}></img> 
                                }
                                <button onClick={()=>{setPostModalOpen(true)}} type="button" className="postBtn">What's on your mind, {AccDetails.AccDetails.username} ?</button>  
                            </div>
                            <hr></hr> 
                            <div className="Sec2">
                                <button onClick={()=>{setPostModalOpen(true)}}><i className="fas fa-image"></i> Photo</button>
                            </div>

                            <Modal isOpen={PostModalOpen} style={window.innerWidth <= 500 ? CustomModal : PostCustomModal}>
                                <div className="PostHeader">
                                <i className="fas fa-times-circle" onClick={()=>setPostModalOpen(false)}></i> 
                                    <h5 style={{textAlign: 'center', padding: '5px'}}>Create Post</h5>
                                    <hr></hr>
                                </div>


                                    

                                <form onSubmit={handlePostSubmit}>

                            <div className="FormContainer"> 


                                <div>
                                <div className="InfoArea">
                                    {
                                        AccDetails.AccDetails.avatar === null ? <img className="InfroAreaImg" src={DefaultProfilePic} alt="ProfilePicture" title={AccDetails.AccDetails.username}></img> : <img className="InfroAreaImg" src={path} alt="ProfilePicture" title={AccDetails.AccDetails.username}></img>
                                    }
                                    <p>{AccDetails.AccDetails.username}</p>
                                </div>

                                

                                <div className="PostInputs">
                                <textarea className="form-control textInput" onChange={(x)=>{setText(x.target.value)}} placeholder="Write Something" rows="5" aria-label="With textarea"></textarea>
                                </div>
                                </div>


                                <div className="text-center ChosenImage">
                                <img src={Chosen} className={Chosen === null ? 'NoImage' : 'PreImage img-fluid'} alt="Preview Image"/>  
                                {Chosen === null ? <span></span> : <i className="fas fa-times-circle Fnli"
                                 onClick={
                                     ()=>{setChosen(null)
                                     setPostImage(null)}
                                }></i>} 
                                </div>

                                <div className="PostBtns">

                                <label className="PhotoBtn" onClick={()=>{setChosen(null)}}>
                                    <input className="Upload-input" type="file" accept="image/png, image/jpg, image/jpeg" filename="cover" onChange={changePostFile}></input>
                                    <i className="fas fa-image"></i> Photo
                                </label>

                                {Text !== ''|| Chosen !== null ? <button type="button" id="PostBtn"  className="btn btn-primary btn-lg btn-block" onClick={handlePostSubmit}>Post</button> : <button type="button" id="PostBtn" disabled  className="btn btn-primary btn-lg btn-block">Post</button>}
                            </div>
                        </div>
                                </form>
                        
                            </Modal>


                        </div>

                        
                        {
                           mapFunc
                           
                        }
                    </div>

            </div>

</div> : <AnotherProfile anotherPerson={AnotherPerson} />
            }

        </div>
    )
}

export default Profile;