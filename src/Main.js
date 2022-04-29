import React from 'react'
import './Main.css'
import SideNav from './SideNav'
import Posts from './Posts'
import UseFetch from './useFetch'

function Main() {
    // console.log(props)
    // const { data: posts, isPending, error } = useFetch("https://reddit-backend-clone.herokuapp.com/api/v1/posts");
    return (
        <div className="main ">
            <SideNav />
            {/* {posts && <Posts posts={posts} />} */}
            <UseFetch />
        </div>
    )
}

export default Main
