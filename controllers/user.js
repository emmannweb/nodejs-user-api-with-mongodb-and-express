const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.userRoutesModels = (req, res) => {
  const email = req.body.email;

  User.findOne({ email }, (err, userEmail) => {
    if (userEmail) {
      return res.status(403).json({ err: "Email already exists!" });
    }
    const user = new User(req.body);
    user
      .save()
      .then(result => {
        return res.status(200).json({
          result
        });
      })
      .catch(err => console.log(err));
  });
};

//sign in mudule
exports.userSignInModule = (req, res) => {
  User.findOne((err, userSignIn) => {
    if (!userSignIn) {
      return res.status(404).json({
        err: "Email not found!"
      });
    }

    bcrypt
      .compare(req.body.password, userSignIn.password)
      .then(isCorrect => {
        if (!isCorrect) {
          return res.status(400).json({
            err: "Email and Password did not match!"
          });
        }
        return res.status(200).json({ sucess: "you was successfully login!" });
      })
      .catch(err => console.log(err));
  });
};

//find all users module
exports.fetchAllUsers = (req, res) => {
  User.find().then(users => {
    return res.status(200).json({ users });
  });
};

// Read a user
exports.readUser = (req, res) => {
  User.findById(req.params.id).then(user => {
    return res.status(200).json({
      user
    });
  });
};

//Update a user
exports.UpdateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    (err, update) => {
      if (err) {
        return res.status(400).json({ err: "bad request" });
      }
      res.status(200).json({ success: "Updated" });
      next();
    }
  );
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id).then(del => {
    return res.json({ user: "user deleted!" });
  });
};

// exports.UpdateUser = function(req, res) {
//   User.findByIdAndUpdate(
//     req.params.id,
//     { $set: req.body },

//     function(err, userUpdate) {
//       if (err) return next(err);
//       res.json({ user: "User udpated.", new: true });
//     }
//   );
// };
