const db = require("../../db/schema");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

var createUser = function(req) {
	return db.Users.create(req.body);
};

var getLikes = function(req) {
	return db.Submissions.findOne({
		attributes: ['like_count'],
		where: {
			id: req.params.sub
		}
	})
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
			console.log('RESULTS HEREEE ', results);
			var list = [];
			results.forEach(element => {
				list.push(element.dataValues.id);
			});
			if(list.length === 0){
				return [];
			}
			return db.Users.findAll({
				where: {
					id: {
						[Op.or]: list
					}
				}
			}).then(function(results) {
				console.log(results)
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
				list.push(element.dataValues.host_id);
			});
			if(list.length === 0){
				return [];
			}
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
	});
};

var deleteFollowing = function(req) {
	return db.Followers.destroy({
		where: req.body
	});
};

var getSubsByFollowing = function(req){
	return db.Users.findAll({
		where: {
			username: req.params.user
		}
	}).then( result => {
		return db.Followers.findAll({
			where: {
				follower_id: result[0].dataValues.id
			}
		}).then(results => {
			var list = [];
			results.forEach(element => {
				list.push(element.dataValues.host_id)
			})
			return db.Submissions.findAll({
				where: {
					user_id: {
						[Op.or]: list
					}
				}
			}).then(results => {
				var list = results.map( (element) => {
					return element.dataValues;
				})
				console.log(list)
				return list;
			})
			.then(submissions => {
				let sub = [];
				var list = submissions.map(submission=>{
					sub.push(db.Users.findOne({
						where: {
							id: submission.user_id
						}
					})
					.then(result => {
						submission.username = result.username;
						return submission;
					}))
				})
				return Promise.all(sub).then(values => (values))
		})
	})
})
}

module.exports = {
	createUser,
	getLikes,
	getUserInfo,
	getFollowers,
	getFollowing,
	getSubsByFollowing,
	deleteFollower,
	deleteFollowing
};
