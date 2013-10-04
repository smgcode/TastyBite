TasteSpottingClone.Models.User = Backbone.Model.extend({

  parse: function(data){
    var posts = new TasteSpottingClone.Collections.Posts(data.posts);
    var favorites = new TasteSpottingClone.Collections.Posts(data.favorites);
    data.posts = posts;
    data.favorites = favorites;
    return data
  },

});