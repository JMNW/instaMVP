import React from "react";

import { Route, Link } from "react-router-dom";

import axios from "axios";
import { connect } from "react-redux";
import actions from "../../Redux/actions/index";
import Comment from "../Comment/Comment.jsx";
import { Image, Circle, Grid, Row, Col } from "react-bootstrap";
import "../../../dist/styles.css";

const mapDispatchToProps = dispatch => {
  return {
    updateUserPosts: posts => dispatch(actions.updateUserPosts(posts))
  };
};
const mapStateToProps = state => {
  return {
    userPostsState: state.userPostsState,
    currUser: state.currUser,
    currClickedUser: state.currClickedUser
  };
};

class PostsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.getUserPosts = this.getUserPosts.bind(this);
  }

  getUserPosts() {
    axios.get(`/subs/${this.props.currClickedUser.username}`).then(result => {
      this.props.updateUserPosts(result.data);
    });
  }

  componentDidMount() {
    this.getUserPosts();
  }

   // removed props from params think it was causing warnings
  postRender() {
    var content = [];

    this.props.userPostsState.forEach((post, i) => {

      content.push(
        <div className="post-container"  key={i}>
          <Image  src={post.image_url} width="100%" rounded="rounded" />
          <Comment postID={post.id} />
        </div>
      );
    });

    return <div align="left">{content}</div>;
  }

  render() {
    return (
      <div width="30%">
      <h1>Posts</h1>
      <div className="post-grid" width="30%">


        {this.postRender()}
      </div>
      </div>
    );
  }
}

const PostsContainerPage = connect(mapStateToProps, mapDispatchToProps)(
  PostsContainer
);
export default PostsContainerPage;
