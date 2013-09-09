window.TasteSpottingClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  initialize: function() {
    var posts = new TasteSpottingClone.Collections.Posts;
    var users = new TasteSpottingClone.Collections.Users;
  
    $.when(posts.fetch(), users.fetch())
      .done(function(postData, userData){
        // TODO Consider using one router, pass in both collections.
        new TasteSpottingClone.Routers.Posts({
          collection: posts
        });
        new TasteSpottingClone.Routers.Users({
          collection: users
        });
        Backbone.history.start();
      })
      .fail(function(){
        console.log(arguments);
        console.log("failed fetching both posts/users");
      });
  }
};

$(document).ready(function(){
  TasteSpottingClone.initialize();
});
