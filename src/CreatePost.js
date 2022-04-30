import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';


function CreatePost() {

    const [category, setCategory] = useState();
    const [title, setTitle] = useState();
    const [caption, setCaption] = useState();
    const [image, setImage] = useState();
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (localStorage.getItem("token")) {
            const post = { category, title, caption, image };
            console.log(post);
            let form = new FormData()
            form.append("title", title)
            form.append("content", caption)
            form.append("image", image)
            form.append("category", category)
            await fetch("https://reddit-backend-clone.herokuapp.com/api/v1/posts", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: form
            }).then(res => res.json())
                .then((data) => {
                    console.log(data)
                    history.push("/")
                },
                    (error) => console.log(error))

        }
        else {
            swal("warning", "you need to first login", "warning")
        }


    };
    const categories = [
        "News",
        "Movie",
        "Music",
        "Entertainment",
        "Arts",
        "Politics"
    ]


    return (
        <div className="container mt-5 mb-5 col-lg-6" style={{ border: '1px solid rgb(252, 69, 4)' }}>
            <h1 className="text-center mt-5 mb-3" style={{ color: 'rgb(252, 69, 4)' }}>CREATE POST</h1>
            <div className="row justify-content-center my-5 me-2 ms-2">
                {/* <div className="col-lg-"> */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="category" className="text-left mb-3">Choose category:</label>
                        <select type="text"
                            className="form-control mb-3 custom-select"
                            id="category"
                            placeholder="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)} required>
                            {categories.map(category => (
                                <option value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="title" className="text-left mb-3">Title:</label>
                        <input type="text"
                            className="form-control mb-3"
                            id="title"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label for="caption" className="mb-3">Caption:</label>
                        <input
                            type="text"
                            className="form-control mb-3"
                            id="caption"
                            value={caption}
                            placeholder="Caption"
                            onChange={(e) => setCaption(e.target.value)} required />
                    </div>
                    {/* <div className="form-group">
                            <label for="confirmNewPassword" className="mb-3">Link (optional):</label>
                            <input type="text" className="form-control mb-5" id="confirmNewPassword" value = {password} placeholder="Confirm new password"/>
                        </div> */}
                    <div className="form-group">
                        <label for="confirmNewPassword" className="mb-3">Image:</label><br />
                        <div className="col-lg-12 border p-5 ps-2">
                            <input
                                type="file"
                                className="form-control-file"
                                id="image"
                                onChange={(e) => setImage(e.target.files[0])} required />
                        </div>
                    </div>
                    <button type="submit" className="btn col-md-12 mt-4 mb-5" style={{ backgroundColor: 'rgb(252, 69, 4)', color: '#fff' }} onClick={handleSubmit}>Post</button>
                </form>
                {/* </div> */}
            </div>
        </div>
    );

}


export default CreatePost