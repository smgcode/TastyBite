TasteSpottingClone.Models.User = Backbone.Model.extend({

  parse: function(data){
    var posts = new TasteSpottingClone.Collections.Posts(data.posts);
    data.posts = posts;
    return data
  },
  
  toJSON: function(){
    var json = Backbone.Model.prototype.toJSON.call(this);
    json.posts = this.posts.toJSON();
    return json
  }

});
