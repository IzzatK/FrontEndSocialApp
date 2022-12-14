import React, { Component } from "react";
import user from "../models/user";
//import DefaultProfile from '../imgs/useravatar.png'
import { list } from "./apiPost";
import { Link } from "react-router-dom";
import DefaultPost from "../imgs/punjabvalley.jpg";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  loadPosts = (posts) => {
    list(posts).then((data) => {
      if (typeof data === "undefined" && data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount(posts) {
    this.loadPosts(posts);
  }
  //users photo must be updated and changed accordingly
  //wrap the users.map in a return with {} surrounding, or with () surrounding and no return statement
  renderPosts = (posts) => {
    return (
      <div
        className="row mb-5"
        style={{ position: "relative", bottom: "50px" }}
      >
        {posts.map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const posterName = post.postedBy ? post.postedBy.name : " Unknown";

          return (
            <div className="card col-md-4" key={i}>
              <div className="card-body">
                {
                  <img
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                    alt={post.title}
                    onError={(i) => (i.target.src = `${DefaultPost}`)}
                    className="img-thunbnail mb-3"
                    style={{ height: "200px", width: "100%" }}
                  />
                }
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body.substring(0, 100)}</p>
                <br />
                <p className="font-italic mark">
                  Posted by <Link to={`${posterId}`}>{posterName} </Link>
                  on {new Date(post.created).toDateString()}
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-raised btn-primary btn-sm"
                >
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        <h2
          className="mt-5 mb-5"
          style={{ position: "relative", bottom: "20px" }}
        >
          {!posts.length ? "Loading..." : "Recent Posts"}
        </h2>

        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default Posts;
