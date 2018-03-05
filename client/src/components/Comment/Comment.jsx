import React from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../Redux/actions/index";
import $ from "jquery";
import "../../../dist/styles.css";


const mapDispatchToProps = dispatch => {
  return {
    updatePostComments: comments =>
      dispatch(actions.updatePostComments(comments))
  };
};

const mapStateToProps = state => {
  return {
    postCommentState: state.postCommentState,
    timelineState: state.timelineState,
    currUserInfo: state.currUserInfo
  };
};

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "so sweet dude",
      submission: 1
    };
    this.addComment = this.addComment.bind(this);
    this.renderComments = this.renderComments.bind(this);
  }

  addComment(props) {
    var content = $(`.${this.props.postID}`).val();
    axios
      .post("/comment", {
        user_id: this.props.currUserInfo.id,
        submission_id: this.props.postID,
        content: content
      })
      .then(response => {
        $(`.${this.props.postID}`).val("");
        response.data.username = this.props.currUserInfo.username;
        this.props.updatePostComments(response.data);
      })
      .catch(error => {})
      .then(axios.get(`/comments/${this.props.postID}`))
  }

  componentDidMount(props) {
    this.renderComments();
  }

  componentWillUnmount() {
    this.props.updatePostComments("initialize");
  }

  renderComments(props) {
    axios.get(`/comments/${this.props.postID}`).then(result => {
      this.props.updatePostComments(result.data);
    });
  }

  render() {
    return (
      <div width="100%" align="center">
        <div width="100%" align="center">

          <table className="comment-table"  width="90%">
            <tbody>
              <tr>
                <td >
                  <div border="1" className="overflow-wrapper border-me">
                  {this.props.postCommentState
                    .filter((comment, i) => {
                      if (comment.submission_id === this.props.postID) {
                        return comment;
                      }
                    })
                    .map((comment, i) => {
                      return (
                        <div align="left" key={i}>
                          <span className="commentBody">
                            <span className="userCell">
                              <a href={"#"} className="userLink">
                                {console.log(comment, typeof comment.username)}
                                <strong>{comment.username.split('@')[0]} </strong>
                              </a>
                            </span>

                            <span className="commentText">
                              {comment.content}
                            </span>

                            <span className="commentMeta">
                              <em>{comment.createdAt}</em>

                            </span>
                          </span>
                        </div>
                      );
                    })}
                    </div>
                  <form width="80%"
                    align="center"
                    className="form-inline sub-comments"
                    role="form"
                  >
                    <textarea
                      type="textarea" rows="30%" cols="80%"
                      className={this.props.postID}
                      placeholder="add comment"
                    />




                  </form>
                  <input
                    type="button"
                    className="btn"
                    value="ADD COMMENT"
                    onClick={() => {
                      this.addComment();
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const CommentPage = connect(mapStateToProps, mapDispatchToProps)(Comment);
export default CommentPage;
