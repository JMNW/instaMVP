import React from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import actions from "../Redux/actions/index";

const mapDispatchToProps = dispatch => {
  return {
    updateFollowing: following => dispatch(actions.updateFollowing(following))
  };
};

const mapStateToProps = state => {
  return {
    followingState: state.followingState
  };
};

class Followers extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //should pull current user from state later on
    axios.get('/following/Johnny')
      .then((response) => {
        console.log('THIS IS THE RESPONSE ', response.data);
        console.log('this is our props ', this.props.updateFollowing);
        this.props.updateFollowing(response.data);
        console.log(this.props)
      })
      .catch((error) => {
        console.log('ERROR IS: ', error);
      })
  }

  render() {
    return (
      <div>
        <h2>FOLLOWING</h2>
        {this.props.followingState.map( (item, i) => {
          return(<div key={i}>{item.username}</div>)
        })}
      </div>
    )
  }
}

const FollowingPage = connect(mapStateToProps, mapDispatchToProps)(Followers);
export default FollowingPage;
