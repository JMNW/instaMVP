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

    this.state = {clicked: false};

    this.getUserPosts = this.getUserPosts.bind(this);
  }

  componentDidMount() {
    this.getUserPosts();
  }

  componentWillReceiveProps(){
    this.setState({currClickedUser: this.props.currClickedUser});
    console.log('gets to component will receive props');
    console.log(this.props.userPostsState);
    this.postRender();
  }

  getUserPosts() {
    axios.get(`/subs/${this.props.currClickedUser.username}`).then(result => {
      this.props.updateUserPosts(result.data);
    });
  }


   // removed props from params think it was causing warnings
  postRender() {
    var content = [];

    this.props.userPostsState.forEach((post, i) => {
      content.push(
        <Col className="col-sm post-container" key={i} xs={6} md={4}>
          <Image width="100%" src={post.image_url} rounded="rounded" />
          <Comment postID={post.id} />
        </Col>
      );
    });

    return <div align="left">{content}</div>;
  }

  render() {
    return (
      <Grid className="container">
        <h1>Posts</h1>
        {this.postRender()}
      </Grid>
    );
  }
}

const PostsContainerPage = connect(mapStateToProps, mapDispatchToProps)(
  PostsContainer
);
export default PostsContainerPage;
