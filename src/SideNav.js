import React from "react";
import "./SideNav.css";

import { Link } from "react-router-dom";

function SideNav() {

  const subreddits = [
    "askreddit",
    "worldnews",
    "videos",
    "funny",
    'askscience'
  ];
  return (
    <div className="sidenav col-md-2">

      <a href="create">
        <button type="button" class="create-post">Create Post</button>
      </a>
 
      <div className="sidenav__link">
        <h5><strong>Subreddits</strong></h5>
        <div className="subreddits-list">
        <ul className="sidenav__subreddit">
          
          {subreddits.map(subreddit => (
              <li><Link to={`/r/${subreddit}`}>{subreddit}</Link></li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
}
 
export default SideNav;
