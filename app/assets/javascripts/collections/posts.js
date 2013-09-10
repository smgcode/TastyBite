TasteSpottingClone.Collections.Posts = Backbone.Collection.extend({

  model: TasteSpottingClone.Models.Post,
  url: "/posts",
  // comparator: function(post) {
  //   return post.get("created_at");
  // }

});
