const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

//route to retrieve thoughts and post a new thought
router.route("/").get(getThoughts).post(createThought);
// route to get a single thought and update or delete it
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);
// route to add a reaction to a thought
router.route("/:thoughtId/reactions").post(addReaction);
//route to delete a reaction
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
