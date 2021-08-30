import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "../Styles/GeneralPosts.css";
import axios from "axios";
import { AccContext } from "./Acc-Context";
import DefaultProfilePic from "../Images/profilepic.png";
import BounceLoader from "react-spinners/ClipLoader";

function GeneralPosts() {
  const AccInfos = useContext(AccContext);
  const [TimeLinePosts, setTimeLinePosts] = useState([]);
  const [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#3EC2FA");
  const [iFollowThis, setIFollowThis] = useState(false);
  const [isClick, setClick] = useState(false);
  const [LikedPost, setLikedPost] = useState("");
  const [SavedLiked, setSavedLiked] = useState([]);
  const [ShowComments, setShowComments] = useState(false);
  const [ThisCommentPost, setThisCommentPost] = useState("");
  const [CommentText, setCommentText] = useState("");
  const [Comments, setComments] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    setLoading(true);
    const myId = await AccInfos.Acc._id;
    axios
      .post("http://localhost:5000/api/p1/timeline", { myId })
      .then((res) => {
        setTimeLinePosts(res.data);
        setLoading(false);
      });

    axios
      .post("http://localhost:5000/api/p1/checklikes", { myId })
      .then((res) => {
        setSavedLiked(res.data.postslike);
      });
  }, []);

  function Movei() {
    history.push(`/Home`);
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
        history.push(`/Home`);

        axios
          .post("http://localhost:5000/api/p1/getcomments", { PostComment })
          .then((res) => {
            setComments(res.data);
          });
      });
  }

  return (
    <div className="GeneralPostsContent">
      {loading === true ? (
        <div className="Spinner3">
          <BounceLoader color={color} loading={loading} size={70} />
        </div>
      ) : (
        <div>
          {TimeLinePosts.length === 0 ? (
            <div>No Posts, Get a New Friends</div>
          ) : (
            <div>
              {TimeLinePosts.map((item, key) => {
                return (
                  <div key={key} className="Posts" id={item._id}>
                    <div className="PostsHeader">
                      <div>
                        {item.avatar === null ? (
                          <img
                            src={DefaultProfilePic}
                            alt="Profile"
                            className="PostsHeaderImg"
                            title={item.username}
                          ></img>
                        ) : (
                          <img
                            src={`../Images/Profiles/${item.avatar}`}
                            alt="Profile"
                            className="PostsHeaderImg"
                            title={item.username}
                          ></img>
                        )}
                        <p>{item.username}</p>
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

                    <div className="PostBtns3">
                      <div
                        id={key}
                        onClick={async () => {
                          const PostId0 = await item._id;
                          setClick(!isClick);
                          setLikedPost(item._id);

                          const myId = await AccInfos.Acc._id;

                          axios
                            .post("http://localhost:5000/api/p1/like", {
                              PostId0,
                              myId,
                            })
                            history.push('/Home')
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
                          ? "WriteComment2"
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
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GeneralPosts;
