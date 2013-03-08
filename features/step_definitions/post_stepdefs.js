var mongoose = require("mongoose");
var assert   = require("assert");
var Post     = require("../../src/models/post");

module.exports = function () {

  this.Before(function (callback) {
    var mongoUri = "mongodb://localhost/pitblog_cucumber";

    mongoose.connect(mongoUri, function (err) {
      if (err) throw err;
      Post.collection.drop(function (err) {
        callback();
      });
    });
  });

  this.When("I write a post", function(callback) {
    this.postAttributes = {
      title:  "Node.js FTW!",
      author: "Pitbi",
      body:   "Trop cool Node :-)"
    };

    var post = new Post(this.postAttributes);
    post.save(callback);
  });

  this.Then(/^I see the post on the blog$/, function(callback) {
    var self  = this;
    var found = false;

    Post.find(function (err, posts) {
      for (var i = 0; i < posts.length; i++) {
        var post = posts[i];

        if (post.equals(self.postAttributes)) {
          found = true;
          break;
        }
      }

      if (found)
        callback();
      else
        callback(new Error("Couldn't find post"));
    });
  });
};
