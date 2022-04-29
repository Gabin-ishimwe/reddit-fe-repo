// import axios from 'axios';
import React from "react";
import { useState} from 'react';
 
const Comments = () => {
    const [ name, setName ] = useState();
    const [ comment, setComment ] = useState();
    const [ addedComment, setAddedComment ] = useState();
    const [commentor, setCommentor] = useState();
 
    const handleSubmit = (e) => {
        e.preventDefault();
 
        const names = {name}
        const comments = {comment};
 
        setAddedComment(comment);
        setCommentor(commentor);
 
        console.log(comments, names);
 
    };
 
    return (
        <div className="border border-success mb-5">
        {addedComment && 
            <div className="container border border-primary" style={{width: '50%'}}>
                <span >Name: </span> 
                <span>{name}</span><br></br>
                <span>Comment: </span> 
                <p style={{maxWidth: '100%'}}>{comment}</p>
            </div>
        }
        <div className="container mt-5 mb-5 col-lg-6 rounded"  style={{border: '1px solid rgb(252, 69, 4)'}}>
            {/* <h1 className="text-center mt-5 mb-3"  style={{color: 'rgb(252, 69, 4)'}}>COMMENT</h1> */}
 
            <div className="row justify-content-center my-5 me-2 ms-2">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="name" className="text-left mb-3">Name</label>
                        <input type="text"
                            className="form-control mb-3"
                            id="name" 
                            placeholder="name"
                            value = {name}
                            onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label for="comment" className="text-left mb-3">Comment:</label>
                        <textarea type="text"
                            className="form-control mb-3"
                            id="comment" 
                            placeholder="comment"
                            value = {comment}
                            onChange={(e) => setComment(e.target.value)}/>
                    </div>
 
                    <button type="submit" className="btn col-md-12 mt-4 mb-5"  style={{backgroundColor: 'rgb(252, 69, 4)', color: '#fff'}}>Comment</button>
                </form>
            </div>
        </div>
        </div>
    );
}
 
export default CreatePost;