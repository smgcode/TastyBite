window.TasteSpottingClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  initialize: function() {
    var posts = new TasteSpottingClone.Collections.Posts
    posts.fetch({
      success: function () {
        // TODO make use of success parameters?
        new TasteSpottingClone.Routers.Posts({
          $rootEl: $("body"),
          collection: posts
        });
        Backbone.history.start();
      }
      // TODO add error: section?
    });
  }
};

$(document).ready(function(){
  TasteSpottingClone.initialize();
});
