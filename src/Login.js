// import axios from 'axios';
import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import swal from "sweetalert"

const UserLogin = () => {
    const [userEmail, setUserEmail] = useState();
    const [password, setPassword] = useState();
    let history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { userEmail, password };
        console.log(user);
        await fetch("https://reddit-backend-clone.herokuapp.com/api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userEmail,
                password: password
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.message === "Invalid password" || data.message === "user doesn't exist") {
                    swal("Invalid credentials!!", "Please log in again", "warning")
                }
                else if (data.error) {
                    swal("Error!!", "Try to log in again", "error")
                }
                else {
                    localStorage.setItem("token", data.token)
                    history.push("/")
                }
            },
                error => console.log(error))

    };

    return (
        <div className="container mt-5 mb-5 col-lg-6" style={{ border: '1px solid rgb(252, 69, 4)' }}>
            <h1 className="text-center mt-5 mb-3" style={{ color: 'rgb(252, 69, 4)' }}>LOG IN</h1>
            <div className="row justify-content-center my-5 me-2 ms-2">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="username" className="text-left mb-3">Email:</label>
                        <input type="text"
                            className="form-control mb-3"
                            id="username"
                            placeholder="Email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label for="password" className="mb-3">Password:</label><br />
                        <input
                            type="password"
                            className="form-control mb-3"
                            value={password}
                            placeholder="Password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type="submit" className="btn btn-primary col-md-12 mt-4 mb-5" style={{ backgroundColor: 'rgb(252, 69, 4)', color: '#fff', border: 'none' }}>login</button>
                    <p className="text-center">Don't have an account? <a href="/signin" style={{ color: 'rgb(252, 69, 4)' }}>Sign up</a></p>
                </form>
            </div>
        </div>
    );
}

export default UserLogin;