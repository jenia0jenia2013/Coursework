var User = require('models/user').User;
var HttpError = require('error').HttpError;
var AuthError = require('models/user').AuthError;
var async = require('async');

exports.get = function(req, res, next) {
    res.render('userconfig');
};

exports.post = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var currentUser = req.session.user;

    User.changeUser(currentUser, username, password, function(err) {
        if (err) {
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }
    });
    res.send({});
};

