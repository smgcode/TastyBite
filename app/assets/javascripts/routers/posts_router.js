TasteSpottingClone.Routers.Posts = Backbone.Router.extend({

  currentView: null,
  categoriesCollection: null,
  usersCollection: null,
  favoritesCollection: null,
  
  initialize: function(options){
    this.collection = options.collection;
    this.categoriesCollection = options.categoriesCollection;
    this.usersCollection = options.usersCollection;
    this.favoritesCollection = options.favoritesCollection;
  },
  
  routes: {
    "": "index",
    "posts/new": "newPost",
    "posts/:id/edit": "editPost",
    "posts/:id/delete": "deletePost",

    "users": "userIndex",
    "users/:id": "userDetails",

    "category/new": "newCategory",
    "category/:id": "showCategory"
  },
  
  index: function(){
    $("#new-post-form").remove();
    var view = new TasteSpottingClone.Views.PostsIndex({
      collection: this.collection,
      usersCollection: this.usersCollection,
      favoritesCollection: this.favoritesCollection
    });
    $("#content").html(view.render().$el);
  },
  
  newPost: function(){
    if (this.currentView){ this.currentView.remove(); }
    this.currentView = new TasteSpottingClone.Views.PostsNew({
      model: new TasteSpottingClone.Models.Post(),
      collection: this.collection,
      categoriesCollection: this.categoriesCollection
    });
    $("#content").html(this.currentView.render().$el);
  },
  
  editPost: function(id){
    if (this.currentView){ this.currentView.remove(); }
    this.currentView = new TasteSpottingClone.Views.PostsEdit({
      model: this.collection.get(id),
      collection: this.collection,
      categoriesCollection: this.categoriesCollection
    });
    $("#content").html(this.currentView.render().$el);
  },
  
  deletePost: function(id){
    if (this.currentView){ this.currentView.remove(); }
    var toDelete = this.collection.get(id);
    toDelete.destroy({
      success: function(model, response, options){
        console.log("deleted post")
      },
      error: function(model, xhr, options){
        console.log("could not delete post");
      }
    });
    Backbone.history.navigate("#/");
  },
  
  userIndex: function(){
    var view = new TasteSpottingClone.Views.UsersIndex({
      collection: this.usersCollection
    });
    $("#content").html(view.render().$el);
  },

  userDetails: function(id){
    var that = this;
    $.when(this.usersCollection.fetch())
      .done(function(userData){
        var view = new TasteSpottingClone.Views.UsersDetails({
          model: that.usersCollection.get(id),
          collection: that.collection,
          usersCollection: that.usersCollection,
          favoritesCollection: that.favoritesCollection
        });
        $("#content").html(view.render().$el);
      })
      .fail(function(){
        console.log(arguments);
        console.log("failed fetching user's posts");
      });
  },
  
  newCategory: function(){
    if (this.currentView){ this.currentView.remove(); }
    this.currentView = new TasteSpottingClone.Views.CategoriesNew({
      model: new TasteSpottingClone.Models.Category(),
      collection: this.categoriesCollection,
    });
    $("#content").html(this.currentView.render().$el);
  },
  
  showCategory: function(id){
    if (this.categoriesCollection.get(id)){
      if (this.currentView){ this.currentView.remove(); }
      this.currentView = new TasteSpottingClone.Views.CategoriesShow({
        model: this.categoriesCollection.get(id),
        collection: this.collection,
      });
      $("#content").html(this.currentView.render().$el);
    }
  }
  
});
