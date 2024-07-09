const { Thought, User } = require('../models');

module.exports = {
    // retrieve all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(thoughts => res.json(thoughts))
      .catch(err => res.status(500).json(err));
  },
  // retrieve one thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then(thought => !thought ? res.status(404).json({ message: 'No thought with that ID' }) : res.json(thought))
      .catch(err => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(thought => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then(user => !user ? res.status(404).json({ message: 'Thought created, but found no user with that ID' }) : res.json('Created the thought 🎉'))
      .catch(err => res.status(500).json(err));
  },
  // update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then(thought => !thought ? res.status(404).json({ message: 'No thought with this ID!' }) : res.json(thought))
    .catch(err => res.status(500).json(err));
  },
  // delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(thought => !thought ? res.status(404).json({ message: 'No thought with this ID!' }) : User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      ))
      .then(user => !user ? res.status(404).json({ message: 'Thought deleted but no user found with this ID!' }) : res.json({ message: 'Thought successfully deleted!' }))
      .catch(err => res.status(500).json(err));
  },
  // add a reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    )
    .then(thought => !thought ? res.status(404).json({ message: 'No thought with this ID!' }) : res.json(thought))
    .catch(err => res.status(500).json(err));
  },
  // remove a reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
    .then(thought => !thought ? res.status(404).json({ message: 'No thought with this ID!' }) : res.json(thought))
    .catch(err => res.status(500).json(err));
  },
};
