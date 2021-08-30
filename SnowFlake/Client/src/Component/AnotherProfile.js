import React, { useEffect, useState, useContext } from "react";
import "../Styles/AnotherProfile.css";
import { useParams, useHistory } from "react-router";
import cover from "../Images/cover.png";
import DefaultProfilePic from "../Images/profilepic.png";
import Verified from "../Images/verified.png";
import { Helmet } from "react-helmet";
import { AccContext } from "./Acc-Context";
import axios from "axios";
import { AccDetailsContext } from "./AccDetails-Context";
import { Link } from "react-router-dom";

function AnotherProfile(props) {
  const params = useParams();
  const [ID, setID] = useState("");
  const AccInfos = useContext(AccContext);
  const AccDet = useContext(AccDetailsContext);
  const [userInformation, setUserInformation] = useState({
    followers: [],
    following: [],
    _id: null,
  });
  const myId = AccInfos.Acc._id;
  const IdFollow = params.id;
  const [UserPosts, setUserPosts] = useState([]);

  const [iFollowThis, setIFollowThis] = useState(false);
  const [isClick, setClick] = useState(false);
  const [LikedPost, setLikedPost] = useState("");
  const [SavedLiked, setSavedLiked] = useState([]);
  const [ShowComments, setShowComments] = useState(false);
  const [ThisCommentPost, setThisCommentPost] = useState("");
  const [CommentText, setCommentText] = useState("");
  const [Comments, setComments] = useState([]);
  const [CommentsList, setCommentsList] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    const newId = await params.id;
    axios
      .post("http://localhost:5000/api/v1/anotherprofile", { newId })
      .then((res) => setUserInformation(res.data));

    // Get user posts

    const Author = await newId;
    axios
      .post("http://localhost:5000/api/p1/getpersonalposts", { Author })
      .then((res) => {
        setUserPosts(res.data);
      });

    const myId = await newId;
    axios
      .post("http://localhost:5000/api/p1/checklikes", { myId })
      .then((res) => {
        setSavedLiked(res.data.postslike);
      });
  }, []);

  useEffect(async () => {
    axios
      .post("http://localhost:5000/api/v1/checkfollow", { myId, IdFollow })
      .then(async (res) => {
        setIFollowThis(res.data);
      });
  }, []);

  useEffect(() => {
    if (iFollowThis === false) {
      axios
        .post("http://localhost:5000/api/v1/checkfollow", { myId, IdFollow })
        .then((res) => {
          setIFollowThis(res.data);
        });
    }
  });

  function handleFollow(e) {
    axios
      .post("http://localhost:5000/api/v1/follow", { myId, IdFollow })
      .then((res) => {
        history.push(`/Profile/${userInformation._id}`);
      });
  }

  function handleUnFollow(x) {
    axios
      .post("http://localhost:5000/api/v1/unfollow", { myId, IdFollow })
      .then((res) => {
        window.location.reload();
      });
  }

  function handleComment(s) {
    s.preventDefault();
    const myId = AccInfos.Acc._id;

    axios
      .post("http://localhost:5000/api/p1/comment", {
        myId,
        ThisCommentPost,
        CommentText,
      })
      .then((res) => {
        const PostComment = ThisCommentPost;
        document.getElementById("Inpuu").value = "";
        history.push(`/Profile/${params.id}`);

        axios
          .post("http://localhost:5000/api/p1/getcomments", { PostComment })
          .then((res) => {
            setComments(res.data);
          });
      });
  }

  function Movei() {
    history.push(`/Profile/${userInformation._id}`);
  }

  return (
    <div>
      <Helmet>
        <title>{userInformation.username + " | SnowFlake"}</title>
      </Helmet>

      <div className="Cover-Profile">
        <div className="cover">
          {userInformation.cover === null ? (
            <img src={cover} className="img-fluid" alt="Cover-Pic"></img>
          ) : (
            <img
              src={`../Images/Covers/${userInformation.cover}`}
              className="img-fluid"
              alt="Cover-Pic"
            ></img>
          )}
        </div>
        <div className="profile">
          <div className="profile-image text-center">
            {userInformation.avatar === null ? (
              <img
                src={DefaultProfilePic}
                alt="Profile"
                className="img-fluid"
              />
            ) : (
              <img
                src={`../Images/Profiles/${userInformation.avatar}`}
                alt="Profile"
                className="img-fluid"
              />
            )}
            <p className="userName">
              {userInformation.username}{" "}
              {userInformation.verified === null ? (
                <span></span>
              ) : (
                <img
                  src={Verified}
                  id="verifiedImg"
                  title="Verified"
                  alt="Verified"
                />
              )}
            </p>
            <p className="Bio">{userInformation.bio}</p>
            <div className="ProfileFoll2">
              <ul>
                <li>
                  <Link>{userInformation.followers.length} Followers</Link>
                </li>
                <li>
                  <Link>{userInformation.following.length} Following</Link>
                </li>
              </ul>
            </div>
            {iFollowThis === false ? (
              <button
                onClick={handleFollow}
                className="btn btn-primary follow"
                id="FollowBtn"
              >
                <i className="fas fa-plus-square"></i> Follow
              </button>
            ) : (
              <button
                onClick={handleUnFollow}
                id="UnFollowBtn"
                className="btn btn-secondary follow"
              >
                <i className="fas fa-minus-square"></i> UnFollow
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="Information-Posts">
        <div className="UserInfromation">
          <h5>Intro</h5>
          <p>
            <i className="fas fa-transgender"></i> Gender:{" "}
            <span>{userInformation.gender}</span>
          </p>
          <p>
            <i className="fas fa-graduation-cap"></i> Study at:{" "}
            <span>{userInformation.studing}</span>
          </p>
          <p>
            <i className="fas fa-home"></i> Lives in:{" "}
            <span>{userInformation.living}</span>
          </p>
          <p>
            <i className="fas fa-heart"></i> Relationship:{" "}
            <span>{userInformation.relationship}</span>
          </p>
          <p>
            <i className="fas fa-briefcase"></i> Current job:{" "}
            <span>{userInformation.job}</span>
          </p>
        </div>

        <div className="UserPosts">
          {UserPosts.length === 0 ? (
            <div className="Message">
              <i className="fas fa-camera"></i> There are no posts yet
            </div>
          ) : (
            UserPosts.map((item, key) => {
              return (
                <div key={key} className="Posts" id={item._id}>
                  <div className="PostsHeader">
                    <div>
                      {userInformation.avatar === null ? (
                        <img
                          src={DefaultProfilePic}
                          alt="Profile"
                          className="PostsHeaderImg"
                          title={userInformation.username}
                        ></img>
                      ) : (
                        <img
                          src={`../Images/Profiles/${userInformation.avatar}`}
                          alt="Profile"
                          className="PostsHeaderImg"
                          title={userInformation.username}
                        ></img>
                      )}
                      <p>{userInformation.username}</p>
                      <p id="Daate" className="Date">
                        {item.date}
                      </p>
                    </div>
                  </div> 

                  <div className="PostContent">
                    <p>{item.text}</p>
                    {item.photo ? (
                      <div className="text-center PostImgContainer">
                        <img
                          src={`../Images/Posts/${item.photo}`}
                          alt="Image"
                        />
                      </div>
                    ) : (
                      <span className="NoSpan"></span>
                    )}
                  </div> 

                  <div className="PostInformation">
                    <div className="Likes">
                      <p>{item.likes.length} Likes</p>
                    </div>
                    <div
                      onClick={async () => {
                        const PostComment = await item._id;
                        setThisCommentPost(item._id);

                        setShowComments(true);
                        setCommentText("");
                        axios
                          .post("http://localhost:5000/api/p1/getcomments", {
                            PostComment,
                          })
                          .then((res) => {
                            setComments(res.data);
                          });
                      }}
                      className="PostComments"
                    >
                      <p>{item.comments.length} Comments</p>
                    </div>
                  </div> 

                  <hr></hr>

                  <div className="PostBtns2">
                    <div
                      id={key}
                      onClick={async () => {
                        const PostId0 = await item._id;
                        setClick(!isClick);
                        setLikedPost(item._id);

                        const myId = await params.id;

                        axios
                          .post("http://localhost:5000/api/p1/like", {
                            PostId0,
                            myId,
                          })
                          .then((res) => {
                            Movei();
                          });
                      }}
                      className={
                        (isClick === true && LikedPost === item._id) ||
                        SavedLiked.find((element) => element === item._id)
                          ? "Liked"
                          : "Like"
                      }
                    >
                      <i className="fas fa-heart"></i> Like
                    </div>
                    <div
                      onClick={async () => {
                        const PostComment = await item._id;
                        setThisCommentPost(item._id);

                        setShowComments(true);
                        setCommentText("");
                        axios
                          .post("http://localhost:5000/api/p1/getcomments", {
                            PostComment,
                          })
                          .then((res) => {
                            setComments(res.data);
                          });
                      }}
                      className="Comment"
                    >
                      <i className="fas fa-comment"></i> Comment
                    </div>
                    <div className="Share">
                      <i className="fas fa-share"></i> Share
                    </div>
                  </div> 

                  <div
                    className={
                      ShowComments === true && ThisCommentPost === item._id
                        ? "WriteComment"
                        : "NoComments"
                    }
                  >
                    <div className="commin">
                      <form onSubmit={handleComment}>
                        <input
                          className="writecomm form-control"
                          id="Inpuu"
                          onChange={(s) => setCommentText(s.target.value)}
                          type="text"
                          placeholder="Write a Comment"
                        ></input>
                      </form>
                    </div>

                    <div className="existsComments">
                      {Comments.map((item, key) => {
                        return (
                          <div className="userComm">
                            {item.avatar === null ? (
                              <img
                                src={DefaultProfilePic}
                                alt="Profile"
                                title="Profile"
                                className="userCommPic"
                              ></img>
                            ) : (
                              <img
                                src={`../Images/Profiles/${item.avatar}`}
                                alt="Profile"
                                title="Profile"
                                className="userCommPic"
                              ></img>
                            )}
                            <div className="CommInfor">
                              <div>
                                <Link to={`/Profile/${item._id}`}>
                                  {item.username}
                                </Link>
                              </div>
                              <p>{item.commenttext}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>  
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default AnotherProfile;
