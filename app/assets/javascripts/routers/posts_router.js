TasteSpottingClone.Routers.Posts = Backbone.Router.extend({

  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.collection = options.collection;
  },
  
  routes: {
    "": "index",
    "posts/new": "newPost"
  },
  
  index: function(){
    $("#new-post-form").remove();
    new TasteSpottingClone.Views.PostsIndex({
      collection: this.collection,
      el: this.$rootEl.find("#content")
    }).render().$el;
  },
  
  newPost: function(){
    var new_post = new TasteSpottingClone.Views.PostsNew({
      model: new TasteSpottingClone.Models.Post(),
      collection: this.collection
    });
    this.$rootEl.find("#content").before(new_post.render().$el);
  }
  
});
