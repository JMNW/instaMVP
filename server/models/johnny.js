const db = require("../../db/schema");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

var createUser = function(req) {
  return db.Users.create(req.body);
};

var getLikes = function(req) {
  return db.Likes.find({
    where: req.params
  });
};

var getUserInfo = function(req) {
  return db.Users.find({
    where: req.params
  });
};

var getFollowers = function(req) {
  return db.Users.findAll({
    where: {
      username: req.params.user
    }
  }).then(result => {
    return db.Followers.findAll({
      where: {
        host_id: result[0].dataValues.id
      }
    }).then(results => {
      var list = [];
      results.forEach(element => {
        list.push(element.dataValues.id);
      });
      return db.Users.findAll({
        where: {
          id: {
            [Op.or]: list
          }
        }
      }).then(function(results) {
        var list = [];
        results.forEach(function(element) {
          list.push(element.dataValues);
        });
        return list;
      });
    });
  });
};

var getFollowing = function(req) {
  return db.Users.findAll({
    where: {
      username: req.params.user
    }
  }).then(result => {
    return db.Followers.findAll({
      where: {
        follower_id: result[0].dataValues.id
      }
    }).then(results => {
      var list = [];
      results.forEach(element => {
        list.push(element.dataValues.id);
      });
      return db.Users.findAll({
        where: {
          id: {
            [Op.or]: list
          }
        }
      }).then(function(results) {
        var list = [];
        results.forEach(function(element) {
          list.push(element.dataValues);
        });
        return list;
      });
    });
  });
};

var deleteFollower = function(req) {
    return db.Followers.destroy({
        where: req.body
      })
}

var deleteFollowing = function(req) {
  return db.Followers.destroy({
      where: req.body
    })
}


module.exports = {
  createUser,
  getLikes,
  getUserInfo,
  getFollowers,
  getFollowing,
  deleteFollower,
  deleteFollowing
};
