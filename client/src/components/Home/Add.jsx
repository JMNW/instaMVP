import React from 'react';

import axios from 'axios';
import {connect} from 'react-redux'
import actions from "../../Redux/actions/index";
import ReactFilestack, { client } from "filestack-react";

import {BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom';
import Home from './Home.jsx';



const mapDispatchToProps = dispatch => {
  return {
    updateAddState: (image_url, caption) => dispatch(actions.updateAddState(image_url, caption)),
    updateTimeline: submissions => dispatch(actions.updateTimeline(submissions))
  };
};

const mapStateToProps = state => {
  return {
    addState: state.addState,
    timelineState: state.timelineState,
    currUser: state.currUser,
  };
};
const options = {
  accept: "image/*",
  maxFiles: 5,
  storeTo: {
    location: "s3"
  }
};
class Add extends React.Component {
  constructor(props) {
    super(props);
    this.postSubmission = this.postSubmission.bind(this);
    this.onCaptionChange = this.onCaptionChange.bind(this);
    this.onImageUrlChange = this.onImageUrlChange.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
  }
  onSuccess(result) {
    console.log("file stack result: ", result);

    axios
      .post("/submit", {
        username: this.props.currUser,
        image_url: result.filesUploaded[0].url,
        caption: this.props.addState.caption
      })
      .then(response => {
        console.log("Successful posted!");
      })
      .catch(error => {
        console.log("this is our error", error);
      });
    // this.props.addState.image_url = result.filesUploaded[0].url;
  }

  postSubmission() {}
  onCaptionChange(e) {
    this.props.addState.caption = e.target.value;
  }

  onImageUrlChange(e) {
    this.props.addState.image_url = e.target.value;
  }


  render(){
    return(

      <div>



      <input
        type="form"
        placeholder="insert caption"
        onChange={this.onCaptionChange}
      />

    <ReactFilestack className="btn"
        apikey="Af4grpuWtTk6IdNCYHbTbz"
        buttonText="Upload a picture!"
        buttonClass="classname"
        options={options}
        onSuccess={this.onSuccess}
      />
            <Route path="/home" component={Home}/>
    </div>

    )
  }
}

const AddContainer = connect(mapStateToProps, mapDispatchToProps)(Add)
export default AddContainer;
