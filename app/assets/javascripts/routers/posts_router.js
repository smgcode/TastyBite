TasteSpottingClone.Routers.Posts = Backbone.Router.extend({

  initialize: function(options){
    this.collection = options.collection;
  },
  
  routes: {
    "": "index",
    "posts/new": "newPost",
    "posts/:id/edit": "editPost",
    "posts/:id/delete": "deletePost"
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
    if (this.currentView){ this.currentView.remove(); }
    this.currentView = new TasteSpottingClone.Views.PostsEdit({
      model: this.collection.get(id),
      collection: this.collection
    });
    $("#content").html(this.currentView.render().$el);
  },
  
  deletePost: function(id){
    if (this.currentView){ this.currentView.remove(); }
    var toDelete = this.collection.get(id);
    // TODO Always successful whether the database removes or does not remove
    // post from database.
    toDelete.destroy({
      success: function(model, response, options){
        console.log("deleted post")
      },
      error: function(model, xhr, options){
        console.log("could not delete post");
      }
    });
    Backbone.history.navigate("#/");
  }
  
});
