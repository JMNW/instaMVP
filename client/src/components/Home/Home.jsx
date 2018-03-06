import React from "react";

import {BrowserRouter as Router, Route, Link, withRouter} from "react-router-dom";
import Submit from "./Submit.jsx";
import AddContainer from "./Add.jsx";
import Requests from "./Requests.jsx";
import User from "../User.jsx";
import Timeline from "./Timeline/Timeline.jsx";
import {connect} from "react-redux";
import actions from "../../Redux/actions/index";
import axios from "axios";
import LandingPage from "../LandingPage.jsx";
import {browerHistory, Redirect} from "react-router";
import Comment from "../Comment/Comment.jsx";
import LikesContainer from "./Likes.jsx";
import ReactFilestack, {client} from "filestack-react";
import {Image, Circle, Grid, Row, Col} from 'react-bootstrap';
import '../../styles/button.css';
import $ from 'jquery';

const mapDispatchToProps = dispatch => {
  return {
    updateTimeline: submissions => dispatch(actions.updateTimeline(submissions)),
    updateCurrUser: user => dispatch(actions.updateCurrUser(user)),
    updateAddState: (image_url, caption) => dispatch(actions.updateAddState(image_url, caption))
  };
};

const mapStateToProps = state => {
  return {currUser: state.currUser, timelineState: state.timelineState, addState: state.addState};
};

const filters = [
  "_1977",
  "aden",
  "brannan",
  "brooklyn",
  "clarendon",
  "earlybird",
  "gingham",
  "hudson",
  "inkwell",
  "kelvin",
  "lark",
  "lofi",
  "maven",
  "mayfair",
  "moon",
  "nashville",
  "perpetua",
  "reyes",
  "rise",
  "slumber",
  "stinson",
  "toaster",
  "valencia",
  "walden",
  "willow",
  "xpro2"
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ""
    };
    this.filterRandom = this.filterRandom.bind(this);
  }
  filterRandom() {
    this.setState({
      filter: filters[Math.floor(Math.random() * filters.length)]
    });
  }

  componentDidMount() {
    axios.get(`/subs/following/${this.props.currUser}`).then(response => {
      this.props.updateTimeline(response.data);
      $(".login").hide();
      $(".showme").show();
    }).catch(error => {
      console.log("ERROR IS: ", error);
    });
  }

  render() {
    return (<div className="post-grid">
      <h1>Insta Home</h1>
      <nav>
        <Link to="/add">
          {" "}
          <button className="btn">Upload a Picture!</button>
        </Link>

        <Link to="/requests">
          <button className="btn">Follow Someone!</button>
        </Link>
        {/* <Requests /> */}


      </nav>

      <div id="timeline" align="center">
        <h1>My Timeline</h1>
        {
          this.props.timelineState.map((item, i) => {
            return (<div className="post-container" key={i}>
              <h3>{item.username}</h3>
              <img width="100%" src={item.image_url} className={this.state.filter} onClick={() => this.filterRandom()}/>
              <LikesContainer postID={item.id}/>
              <p>{item.caption}</p>
              <Comment postID={item.id}/>
            </div>);
          })
        }
        {
          !this.props.currUser
            ? <Redirect to="/"/>
            : null
        }
      </div>
      <Route exact="exact" path="/" component={LandingPage}/>
      <Route path="/user" component={User}/>
      <Route path="/submit" component={Submit}/>
      <Route path="/add" component={AddContainer}/>

      <Route path="/requests" component={Requests}/>
    </div>);
  }
}

const Homepage = withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
export default Homepage;
