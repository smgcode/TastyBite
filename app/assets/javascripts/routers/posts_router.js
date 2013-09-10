TasteSpottingClone.Routers.Posts = Backbone.Router.extend({

  initialize: function(options){
    this.collection = options.collection;
  },
  
  routes: {
    "": "index",
    "posts/new": "newPost",
    "posts/:id/edit": "editPost"
  },
  
  index: function(){
    $("#new-post-form").remove();
    var view = new TasteSpottingClone.Views.PostsIndex({
      collection: this.collection
    });
    $("#content").html(view.render().$el);
  },

  currentView: null,
  
  newPost: function(){
    if (this.currentView){ this.currentView.remove(); }
    this.currentView = new TasteSpottingClone.Views.PostsNew({
      model: new TasteSpottingClone.Models.Post(),
      collection: this.collection,
    });
    $("#content").html(this.currentView.render().$el);
  },
  
  editPost: function(id){
    console.log("Editing Post");

    if (this.currentView){ this.currentView.remove(); }
    this.currentView = new TasteSpottingClone.Views.PostsEdit({
      model: this.collection.get(id),
      collection: this.collection
    });
    $("#content").html(this.currentView.render().$el);
  }
  
});
