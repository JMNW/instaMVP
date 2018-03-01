const model = require("./models/model");
const nelson = require("./models/nelson");
const johnny = require("./models/johnny");
const comment = require("./models/comment");
const will = require("./models/willEndpoints");

module.exports = {
  getAllSubs: (req, res) => {
    nelson.getAllSubs().then(submissions => {
      res.send(submissions);
    });
  },

  getAllSubs: (req, res) => {
    nelson.getAllSubs().then(submissions => {
      res.send(submissions);
    });
  },

  getUserSubs: (req, res) => {
    will.getUserSubs(req, res).then(data => {
      res.send(data);
    });
  },

  getFollowers: (req, res) => {
    johnny.getFollowers(req).then(followers => {
      res.send(followers);
    });
  },

  getFollowing: (req, res) => {
    johnny.getFollowing(req).then(following => {
      res.send(following);
    });
  },

  getSubLikes: (req, res) => {
    johnny.getLikes(req).then(function(likes) {
      res.send(likes);
    });
  },

  getSubComments: (req, res) => {
    comment.getSubComments(req, res).then(comments => {
      res.send(comments);
    });
  },

  getUserInfo: (req, res) => {
    johnny.getUserInfo(req).then(function(info) {
      res.send(info);
    });
  },

  getPendingFollowers: (req, res) => {
    will.getPendingFollowers(req, res).then(result => {
      res.send(result);
    });
  },

  getSubsByFollowing: (req, res) => {
    johnny.getSubsByFollowing(req, res).then(result => {
      res.send(result);
    });
  },

  postInfo: (req, res) => {
    johnny
      .createUser(req)
      .then(function(result) {
        res.send("User Created!");
      })
      .catch(function(error) {
        console.log("ERRROR: ", error);
      });
  },

  submit: (req, res) => {
    will.postSubmit(req).then(result => {
      res.status(201).end();
    });
  },

  comment: (req, res) => {
    comment.postComment(req, res).then(comment => res.send(comment));
  },

  requestFollower: (req, res) => {
    will.requestFollower(req, res).then(data => {
      res.end();
    });
  },

  addFollower: (req, res) => {
    will.addFollower(req, res).then(data => {
      res.end();
    });
  },

  updateInfo: (req, res) => {
    res.send("UpdateInfo Success");
  },

  updateSubmission: (req, res) => {
    res.send("updateSubmission Success");
  },

  updateComment: (req, res) => {
    comment.updateComment(req, res).then(comment => {
      res.send(comment);
    });
  },

  deleteSubmission: (req, res) => {
    nelson.deleteSubmission(req).then(result => {
      res.send("delete success");
    });
  },

  deleteComment: (req, res) => {
    comment.deleteComment(req, res);
  },

  deleteFollower: (req, res) => {
    johnny.deleteFollower(req).then(function(follower) {
      res.send("Deleted Follower");
    });
  },

  deleteFollowing: (req, res) => {
    johnny.deleteFollowing(req).then(function(follower) {
      res.send("Unfollowed");
    });
  },

  deleteUser: (req, res) => {
    nelson.deleteUser(req).then(result => {
      res.send("delete User Success");
    });
  }
};
