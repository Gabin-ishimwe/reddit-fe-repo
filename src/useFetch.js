import { useState, useEffect } from 'react';
import React from 'react';
import { BiCommentDetail } from 'react-icons/bi'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const UseFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(null);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState(null)

    let history = useHistory()
    const upvoteClick = async (postId) => {
        if (localStorage.getItem("token")) {
            await fetch(`https://reddit-backend-clone.herokuapp.com/api/v1/posts/${postId}/upvote`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data)
                },
                    (error) => console.log(error))

        }
        else {
            swal("warning", "You need to login first", "warning")
        }

    }

    const downvoteClick = async (postId) => {
        if (localStorage.getItem("token")) {
            await fetch(`https://reddit-backend-clone.herokuapp.com/api/v1/posts/${postId}/downvote`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data)
                },
                    (error) => console.log(error))
        }

        else {
            swal("warning", "You need to login first", "warning")
        }
    }

    useEffect(() => {
        fetch("https://reddit-backend-clone.herokuapp.com/api/v1/posts", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw Error("Could not fetch :(")
                }
                return res.json()
            })
            .then(result => {
                setData(result.data)
                console.log(result)
                setIsPending(false)
                setError(null)
                setPosts(result.data)
            })
            .catch(err => {
                setError(err.message)
                setIsPending(false)
            })

    }, [])
    if (posts !== null) {

        return (
            <section className="posts">
                {posts.map((post) => (
                    <div className="card mb-3" style={{ "max-width": "950px", "margin-left": "50px", "margin-right": "50px", "margin-top": "10px", "padding-top": "20px", "padding-bottom": "20px" }}>
                        <div className="row g-0">
                            <div className="col-md-1">
                                <ImArrowUp className="up" style={{ "font-color": "white" }} onClick={() => upvoteClick(post._id)} />
                                <p style={{ "margin-bottom": "0px" }}>{post.likes}</p>
                                <ImArrowDown className="down" onClick={() => downvoteClick(post._id)} />
                            </div>
                            <div className="col-md-3">
                                <img src={post.image[0]} className="img-fluid rounded-start" alt="..." style={{ "max-height": "200px" }} />
                            </div>
                            <div className="col-md-7" style={{ "text-align": "left", "position": "relative" }} onClick={() => {
                                localStorage.setItem("postId", post._id)
                                history.push("/view")
                            }}>
                                <div className="card-body">
                                    <div style={{ "display": "inline-block" }}>
                                        <p style={{ "display": "inline-block", "padding-right": "20px" }}><small className="text-muted">Category: {post.category}</small></p>
                                        <p style={{ "display": "inline-block", "padding-right": "20px" }}><small className="text-muted">posted by: {post.author}</small></p>
                                        <p style={{ "display": "inline-block", "padding-right": "20px" }}><small className="text-muted">at: {post.date}</small></p>
                                    </div>
                                    <h5 className="card-title ">{post.title}</h5>
                                    {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>                      */}
                                </div>
                                <div className="comments d-inline-flex" style={{ "text-align": "left", "position": "absolute", "bottom": "0px" }}>
                                    <BiCommentDetail style={{ "height": "25px", "margin-left": "15px", "margin-right": "10px" }} />
                                    <p style={{ "margin-bottom": "0px" }}>{post.comments.length} comments</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        )
    }
    else {
        return (
            <h1>Loading....</h1>
        )
    }
}

export default UseFetch;