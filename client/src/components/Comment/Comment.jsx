import React from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../Redux/actions/index";
import $ from "jquery";

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
        this.props.updatePostComments(response.data);
      })
      .catch(error => {})
      .then(axios.get(`/comments/${this.props.postID}`));
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
      <div align="center">
        <div align="center">
          {this.props.postID}
          <table>
            <tbody>
              <tr>
                <td>
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
                                <strong>{comment.username.split('@')[0]} </strong>
                              </a>
                            </span>

                            <span className="commentText">
                              {comment.content}
                            </span>

                            <span className="commentMeta">
                              <em />
                            </span>
                          </span>
                        </div>
                      );
                    })}
                  <form
                    align="center"
                    className="form-inline sub-comments"
                    role="form"
                  >
                    <input
                      type="textbox"
                      className={this.props.postID}
                      placeholder="add comment"
                    />

                    <input
                      type="button"
                      value="ADD COMMENT"
                      onClick={() => {
                        this.addComment();
                      }}
                    />
                  </form>
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
