const Post = require("../models/post_model");

const getPosts = async (req, res) => {
  try {
    posts = await Post.find();
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send({
      status: "fail",
      error: err.message
    });
  }
};
const getPostById = async (req, res) => {
  try {
    posts = await Post.findById(req.params.id);
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send({
      status: "fail",
      error: err.message
    });
  }
};

const addNewPost = (req, res) => {
  console.log("addNewPost " + req.body.message);

  const post = Post({
    message: req.body.message,
    sender: req.body.sender
  });

  post.save((error, newPost) => {
    if (error) {
      res.status(400).send({
        status: "fail",
        error: error.message
      });
    } else {
      res.status(200).send(newPost);
    }
  });
};

module.exports = { getPosts, addNewPost, getPostById };
