import React from 'react';
import {BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom';
import Home from './Home/Home.jsx';
import PostsContainerPage from './User/PostsContainer.js';
import Following from './Following.jsx';
import Followers from './Followers.jsx';
import InfoPage from './User/Info.js';
import Profile from './ProfilePage.jsx';

import {connect} from "react-redux";
import actions from "../Redux/actions/index";
import {browserHistory, Redirect} from "react-router";
import styles from '../styles/button.css';

const mapDispatchToProps = dispatch => {
  return {
    updateCurrClickedUser: user => dispatch(actions.updateCurrClickedUser(user))
  };
};

const mapStateToProps = state => {
  return {currUser: state.currUser,
  currClickedUser: state.currClickedUser,
  currUserInfo: state.currUserInfo
  };
};

class User extends React.Component {
  constructor(props) {
    super(props);

    this.clickMyPage = this.clickMyPage.bind(this);
  }

  clickMyPage() {
    console.log('HERE IS THE CURR USER INFO: ', this.props.currUserInfo)
    this.props.updateCurrClickedUser(this.props.currUserInfo);
  }

  render() {

    return (<div>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <button onClick={() => this.clickMyPage()}>My Page</button>
      <h1>{this.props.currClickedUser.username.split('@')[0]}</h1>
      <Following/>
      <Followers/>
      <InfoPage/>

      <PostsContainerPage/>

      <Route path="/home" component={Home}/>
      <Route path="/profile" component={Profile} />
    </div>);
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
