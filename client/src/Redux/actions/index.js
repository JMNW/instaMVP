export default {
  addComment: (content, submission_id) => {
    return {
      type: "ADD_COMMENT",
      submission_id,
      content
    };
  },

  toggleLikeSubmission: submission_id => {
    return {
      type: "TOGGLE_LIKE_SUBMISSION",
      submission_id
    };
  },

  addSubmission: (image_url, caption, user_id) => {
    return {
      type: "ADD_SUBMISSION",
      user_id,
      image_url,
      caption
    };
  },

  acceptFollowerRequest: (host_id, follower_id) => {
    return {
      type: "ADD_FOLLOWER",
      host_id,
      follower_id,
      pending: false
    };
  },

  // export const denyFollowerRequest;

  // LEFT OFF HERE
  addSomeoneToFollow: () => {
    return {
      type: "ADD_SOMEONE_TO_FOLLOW"
    };
  },

  // export const navigateToUserProfile;

  // export const logout;

  updateTimeline: submissions => ({
    type: "UPDATE_TIMELINE",
    payload: submissions
  }),

  updateUserPosts: posts => ({
    type: "UPDATE_USER_POSTS",
    payload: posts
  }),

  updateAddState: (image_url, caption) => ({
    type: "UPDATE_ADD_STATE",
    payload: { image_url: image_url, caption: caption }
  }),
  updateFollowers: followers => ({
    type: "UPDATE_FOLLOWERS",
    payload: followers
  }),

  updateFollowing: following => ({
    type: "UPDATE_FOLLOWING",
    payload: following
  })
};
