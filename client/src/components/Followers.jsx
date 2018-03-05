import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import actions from "../Redux/actions/index";

const mapDispatchToProps = dispatch => {
  return {
    updateUserPosts: posts => dispatch(actions.updateUserPosts(posts)),
    updateFollowers: followers => dispatch(actions.updateFollowers(followers)),
    updateCurrUser: user => dispatch(actions.updateCurrUser(user)),
    updateCurrClickedUser: user => dispatch(actions.updateCurrClickedUser(user))
  };
};

const mapStateToProps = state => {
  return {
    userPostsState: state.userPostsState,
    followersState: state.followersState,
    currUser: state.currUser,
    currClickedUser: state.currClickedUser
  };
};

class Followers extends React.Component {
  constructor(props) {
    super(props);
    this.showFollowers = this.showFollowers.bind(this);
    this.clickUser = this.clickUser.bind(this);
  }

  showFollowers() {
    axios
      .get(`/followers/${this.props.currUser}`)
      .then(response => {
        this.props.updateFollowers(response.data);
      })
      .catch(error => {
        console.log("ERROR IS: ", error);
      });
  }

  clickUser(i) {
    this.props.updateCurrClickedUser(this.props.followersState[i]);
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-primary"
          data-toggle="modal"
          data-target=".followers-list"
          onClick={() => this.showFollowers()}
        >
          Followers
        </button>

        <div
          className="modal fade followers-list"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-sm">
            <h5>Followers</h5>
            <div className="modal-content">
              {this.props.followersState.map((item, i) => {
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

const FollowersPage = connect(mapStateToProps, mapDispatchToProps)(Followers);
export default FollowersPage;
