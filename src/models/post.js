var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
  title:  String,
  author: String,
  body:   String
});

postSchema.methods.equals = function (other) {
  var attributes = ["title", "author", "body"];
  for (var i = 0; i < attributes.length; i++) {
    var attribute = attributes[i];
    if (this[attribute] != other[attribute])
      return false;
  }
  return true;
};

var Post = mongoose.model("Post", postSchema);

module.exports = Post;
