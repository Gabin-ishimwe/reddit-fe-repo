// import useFetch from 'useFetch';
import { BiCommentDetail } from 'react-icons/bi'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import { useEffect, useState } from 'react';
import React from 'react';
import swal from 'sweetalert';

const OnePost = () => {
    const [name, setName] = useState();
    const [comment, setComment] = useState();
    const [displayName, setdisplayName] = useState()
    const [displayComment, setdisplayComment] = useState()
    // const [addedComment, setAddedComment] = useState();
    // const [commentor, setCommentor] = useState();
    const [posts, setPosts] = useState(null)
    const [like, setLikes] = useState(1)

    useEffect(() => {
        fetch(`https://reddit-backend-clone.herokuapp.com/api/v1/posts/${localStorage.getItem("postId")}`, {
            method: "GET"
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setPosts(data)
            })
    }, [])
    const upvoteClick = () => {
        if (localStorage.getItem("token")) {
            const upvote = async (id) => {
                await fetch(`https://reddit-backend-clone.herokuapp.com/api/v1/posts/${id}/upvote`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                    .then(res => res.json())
                    .then((data) => {
                        console.log(data)
                        setLikes(data.data.likes)
                        console.log(like)
                    },
                        (error) => console.log(error))
            }

            upvote(localStorage.getItem("postId"))

        }
        else {
            swal("warning", "You need to login first", "warning")
        }

    }

    const downvoteClick = () => {
        if (localStorage.getItem("token")) {
            const downvote = async (id) => {
                await fetch(`https://reddit-backend-clone.herokuapp.com/api/v1/posts/${id}/downvote`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                    .then(res => res.json())
                    .then((data) => {
                        console.log(data)
                        setLikes(data.data.likes)
                        console.log(like)
                    },
                        (error) => console.log(error))
            }

            downvote(localStorage.getItem(localStorage.getItem("postId")))
        }
        else {
            swal("warning", "You need to login first", "warning")
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const names = { name }
        const comments = { comment };
        console.log(comments, names);
        if (localStorage.getItem("token")) {
            await fetch(`https://reddit-backend-clone.herokuapp.com/api/v1/posts/${localStorage.getItem("postId")}/comments`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    content: comment
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setdisplayName(data.data.name)
                    setdisplayComment(data.data.content)
                })
        }
        else {
            swal("warning", "You need to login first", "warning")
        }


    };
    if (posts !== null) {
        return (

            <div className="container mt-5 mb-5 p-5 " style={{ border: '1px solid rgb(252, 69, 4)' }}>
                <div className="card mb-3" style={{ border: '1px solid rgb(252, 69, 4)', "max-width": "950px", "margin-left": "50px", "margin-right": "50px", "margin-top": "10px", "padding-top": "20px", "padding-bottom": "20px" }}>
                    <div className="row g-0 ms-4 me-4">
                        <div className="row">
                            <div className="col-md-1">
                                <ImArrowUp className="up" style={{ "font-color": "white" }} onClick={upvoteClick} />
                                <p style={{ "margin-bottom": "0px" }}>{posts.data.likes}</p>
                                <ImArrowDown className="down" onClick={downvoteClick} />
                            </div>
                            <div className="col-md-3">
                                <img src={posts.data.image[0]} className="img-fluid rounded-start" alt="..." style={{ "max-height": "200px" }} />
                            </div>
                        </div>
                        <div className="col-md-7" style={{ "text-align": "left", "position": "relative" }}>
                            <div className="card-body">
                                {/* <div style={{"display":"inline-block"}}>
                                    <p style={{"display":"inline-block","padding-right":"20px" }}><small className="text-muted">Community: {posts.community}</small></p>
                                    <p style={{"display":"inline-block","padding-right":"20px"}}><small className="text-muted">posted by: {posts.author}</small></p>
                                    <p style={{"display":"inline-block","padding-right":"20px"}}><small className="text-muted">at: {posts.date}</small></p>
                                </div> */}
                                <h5 className="card-title ">{posts.data.title}</h5>
                                <p className="card-text mt-3 mb-5">{posts.data.content}</p>
                            </div>
                            <div className="comments d-inline-flex" style={{ "text-align": "left", "position": "absolute", "bottom": "0px" }}>
                                <BiCommentDetail style={{ "height": "25px", "margin-left": "20px", "margin-right": "10px" }} />
                                <p style={{ "margin-bottom": "0px" }}>{posts.data.comments.length} comments</p>
                            </div>
                        </div>

                        {posts.data.comments.map(comment => (
                            <div className="container rounded" style={{ width: '90.5%', backgroundColor: '#fff', border: '1px solid rgb(252, 69, 4)', margin: "10px" }}>
                                {/* <span >Name: </span> */}
                                <span >{comment.name}</span>
                                {/* <span>Comment: </span> */}
                                <p style={{ maxWidth: '100%' }}>{comment.content}</p>
                            </div>
                        ))}
                        {(displayName && displayComment) &&
                            <div className="container rounded" style={{ width: '90.5%', backgroundColor: '#fff', border: '1px solid rgb(252, 69, 4)', margin: "10px" }}>
                                <span >{displayName}</span>
                                <p style={{ maxWidth: '100%' }}>{displayComment}</p>
                            </div>
                        }

                        <div className="container mt-5 mb-5 col-lg-12 rounded ps-5 pe-5" style={{ border: '1px solid rgb(252, 69, 4)' }} >
                            <div className="row justify-content-center">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label for="name" className="text-left mt-4 mb-3">Name</label>
                                        <input type="text"
                                            className="form-control mb-3"
                                            id="name"
                                            placeholder="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label for="comment" className="text-left mb-3">Comment:</label>
                                        <textarea type="text"
                                            className="form-control mb-3"
                                            id="comment"
                                            placeholder="comment"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)} />
                                    </div>

                                    <button type="submit" className="btn col-md-12 mt-4 mb-4" style={{ backgroundColor: 'rgb(252, 69, 4)', color: '#fff' }}>Comment</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
                {/* {(displayName !== null && displayComment !== null) ?
                    <div className="container rounded" style={{ width: '90.5%', backgroundColor: '#fff', border: '1px solid rgb(252, 69, 4)' }}>
                        <span >Name: </span>
                        <span >{displayName}</span><br></br>
                        <span>Comment: </span>
                        <p style={{ maxWidth: '100%' }}>{displayComment}</p>
                    </div>
                    : <h1>comment loading...</h1>
                } */}

            </div>
        );
    }
    else {
        return (<h1>loading...</h1>)
    }

}

export default OnePost;
