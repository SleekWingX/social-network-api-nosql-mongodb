const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// route to get users and create a new one
router.route("/").get(getUsers).post(createUser);
// route to retrieve a single user and update or delete them
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);
// route to add or remove friends
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
