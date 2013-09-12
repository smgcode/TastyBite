window.TasteSpottingClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  initialize: function() {
    var posts = new TasteSpottingClone.Collections.Posts;
    var users = new TasteSpottingClone.Collections.Users;
    var categories = new TasteSpottingClone.Collections.Categories;
    
    $.when(posts.fetch(), users.fetch(), categories.fetch())
      .done(function(postData, userData, categoryData){
        // TODO Consider using one router, pass in both collections.

        new TasteSpottingClone.Routers.Posts({
          collection: posts,
          categoriesCollection: categories
        });
        new TasteSpottingClone.Routers.Users({
          collection: users
        });
        Backbone.history.start();
      })
      .fail(function(){
        console.log(arguments);
        console.log("failed fetching one or more collections");
      });
  }
};

$(document).ready(function(){
  TasteSpottingClone.initialize();
});
