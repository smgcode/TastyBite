window.TasteSpottingClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  initialize: function() {
    var posts = new TasteSpottingClone.Collections.Posts;
    var users = new TasteSpottingClone.Collections.Users;
    var categories = new TasteSpottingClone.Collections.Categories;
    var favorites = new TasteSpottingClone.Collections.Favorites;

    $.when(
      posts.fetch(),
      users.fetch(),
      categories.fetch(),
      favorites.fetch())
    .done( function(){
      new TasteSpottingClone.Routers.Posts({
        collection: posts,
        categoriesCollection: categories,
        usersCollection: users,
        favoritesCollection: favorites
      });
      new TasteSpottingClone.Routers.Users({
        collection: users
      });
      Backbone.history.start();})
    .fail(function(){
      console.log(arguments);
      console.log("failed fetching one or more collections");
    });
  }
};

$(document).ready(function(){
  TasteSpottingClone.initialize();
});
