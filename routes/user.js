const express = require("express");
const router = express.Router();
const {
  userRoutesModels,
  userSignInModule,
  fetchAllUsers,
  readUser,
  UpdateUser,
  deleteUser
} = require("../controllers/user");

// ROUTES
router.post("/signup", userRoutesModels);
router.get("/signin", userSignInModule);
router.get("/users", fetchAllUsers);
router.get("/user/:id", readUser);
router.put("/update/:id", UpdateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
