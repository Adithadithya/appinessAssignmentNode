var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var newConnect = mongoose.createConnection('mongodb://localhost:27017/test');
var userSchema = require('../../schema/users')
var userRoleSchema = require('../../schema/userRole');
const { user_id } = require('../../schema/users');

module.exports = {
    register: (req, res, next) => {
        newConnect.models = {};
        var role = "user";
        var users = new Schema(userSchema, { collection: "users" });
        var usersMaster = newConnect.model("users", users);
        var userRole = new Schema(userRoleSchema, { collection: "userRole" });
        var userRoleMaster = newConnect.model("userRole", userRole);

        var user = new usersMaster(req.body);

        user.save().then(e => {
            //count the number of records in the database and decide the role of the users and save it in user_role collection
            usersMaster.count({}, function (err, result) {
                if (err) {
                    console.log(err);

                } else {
                    if (result == 1) {
                        role = "Admin"
                    }
                    var rolemaster = new userRoleMaster({ user_id: req.body.user_id, role: role })
                    rolemaster.save().then(e => {
                        return res.send(e);

                    })
                }
            });
        })

    },
    deleteAll: (req, res, next) => {
        newConnect.models = {};
        var users = new Schema(userSchema, { collection: "users" });
        var usersMaster = newConnect.model("users", users);

        usersMaster.remove({}).exec(function (err, data) {
            if (err) {
                console.log(err);
            } else {
                return res.send(data)
            }
        })

    },
    fetchAll: (req, res, next) => {
        newConnect.models = {};
        var users = new Schema(userSchema, { collection: "users" });
        var usersMaster = newConnect.model("users", users);

        usersMaster.aggregate([
            {
                $lookup:
                {
                    from: "userRole",
                    localField: "user_id",
                    foreignField: "user_id",
                    as: "user_role"
                }
            },
            {
                $project: {
                    user_id: 1,
                    emp_name: 1,
                    role: "$user_role.role"

                }
            }
        ]).exec((err, result) => {
            if (err) {
                console.log("error", err)
            }
            else {
                return res.send(result)
            }
        });
    }

}

