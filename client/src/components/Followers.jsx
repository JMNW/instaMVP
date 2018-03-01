import React from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import actions from "../Redux/actions/index";

const mapDispatchToProps = dispatch => {
  return {
    updateFollowers: followers => dispatch(actions.updateFollowers(followers))
  };
};

const mapStateToProps = state => {
  return {
    followersState: state.followersState
  };
};

class Followers extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //should pull current user from state later on
    axios.get('/followers/Johnny')
      .then((response) => {
        console.log('THIS IS THE RESPONSE ', response.data);
        console.log('this is our props ', this.props.updateFollowers);
        this.props.updateFollowers(response.data);
        console.log(this.props)
      })
      .catch((error) => {
        console.log('ERROR IS: ', error);
      })
  }

  render() {
    return (
      <div>
        <h2>FOLLOWERS</h2>
        {this.props.followersState.map( (item, i) => {
          return(<div key={i}>{item.username}</div>)
        })}
      </div>
    )
  }
}

const FollowersPage = connect(mapStateToProps, mapDispatchToProps)(Followers);
export default FollowersPage;
