import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import actions from "../Redux/actions/index";

const mapDispatchToProps = dispatch => {
  return {
    updateUserPosts: posts => dispatch(actions.updateUserPosts(posts)),
    updateFollowing: following => dispatch(actions.updateFollowing(following)),
    updateCurrUser: user => dispatch(actions.updateCurrUser(user)),
    updateCurrClickedUser: user => dispatch(actions.updateCurrClickedUser(user))
  };
};

const mapStateToProps = state => {
  return {
    userPostsState: state.userPostsState,
    followingState: state.followingState,
    currUser: state.currUser,
    currClickedUser: state.currClickedUser
  };
};

class Followers extends React.Component {
  constructor(props) {
    super(props);
    this.getFollowing = this.getFollowing.bind(this);
    this.clickUser = this.clickUser.bind(this);
  }

  getFollowing() {
    axios
      .get(`/following/${this.props.currUser}`)
      .then(response => {
        this.props.updateFollowing(response.data);
      })
      .catch(error => {
        console.log("ERROR IS: ", error);
      });
  }

  clickUser(i) {
    axios
      .get(`/subs/${this.props.currClickedUser.username}`)
      .then(result => {
        this.props.updateUserPosts(result.data);
      })
      .then(() =>
        this.props.updateCurrClickedUser(this.props.followingState[i])
      );
  }

  render() {
    return (
      <div>
        <h2
          className="btn btn-primary"
          data-toggle="modal"
          data-target=".following-list"
          onClick={this.getFollowing}
        >
          Following
        </h2>

        <div
          className="modal fade following-list"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-sm">
            <h5>Following</h5>
            <div className="modal-content">
              {this.props.followingState.map((item, i) => {
                return (
                  <div key={i} onClick={() => this.clickUser(i)}>
                    {item.username.split("@")[0]}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const FollowingPage = connect(mapStateToProps, mapDispatchToProps)(Followers);
export default FollowingPage;
