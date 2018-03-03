import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import Submit from "./Submit.jsx";
import AddContainer from "./Add.jsx";
import Requests from "./Requests.jsx";
import User from "../User.jsx";
import Timeline from "./Timeline/Timeline.jsx";
import { connect } from "react-redux";
import actions from "../../Redux/actions/index";
import axios from "axios";
import LandingPage from "../LandingPage.jsx";
import { browerHistory, Redirect } from "react-router";
import Comment from "../Comment/Comment.jsx";
import LikesContainer from "./Likes.jsx";
import ReactFilestack, { client } from "filestack-react";

const mapDispatchToProps = dispatch => {
  return {
    updateTimeline: submissions =>
      dispatch(actions.updateTimeline(submissions)),
    updateCurrUser: user => dispatch(actions.updateCurrUser(user)),
    updateAddState: (image_url, caption) =>
      dispatch(actions.updateAddState(image_url, caption))
  };
};

const mapStateToProps = state => {
  return {
    currUser: state.currUser,
    timelineState: state.timelineState,
    addState: state.addState
  };
};


class Home extends React.Component {
  constructor(props) {
    super(props);


  }



  componentDidMount() {
    axios
      .get(`/subs/following/${this.props.currUser}`)
      .then(response => {
        this.props.updateTimeline(response.data);
      })
      .catch(error => {
        console.log("ERROR IS: ", error);
      });
  }

  render() {
    return (
      <div>
        <h1>Insta Home</h1>
        <nav>
          <ul>
            <li>
              <Link to="/submit">Submit</Link>
            </li>
            <li>
              <Link to="/add">Add</Link>
              <AddContainer />
            </li>
            <li>
              <Link to="/requests">Requests</Link>
              <Requests />
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
          </ul>
        </nav>

        <div id="timeline" align="center">
          <h1>My Timeline</h1>
          {this.props.timelineState.map((item, i) => {
            return (
              <div key={i}>
                <h3>{item.username.split('@')[0]}</h3>
                <img width="40%" src={item.image_url} alt="" />
                <LikesContainer postID={item.id} />
                <p>{item.caption}</p>
                <Comment postID={item.id} />
              </div>
            );
          })}
          {this.props.currUser ? <Redirect to="/home" /> : <Redirect to="/" />}
        </div>
        <Route exact path="/" component={LandingPage} />
        <Route path="/user" component={User} />
        <Route path="/submit" component={Submit} />
        <Route path="/add" component={AddContainer} />
        
        <Route path="/requests" component={Requests} />
        
      </div>
    );
  }
}

const Homepage = withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
export default Homepage;
