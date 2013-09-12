TasteSpottingClone.Models.Post = Backbone.Model.extend({
  parse: function(data){
    var categories = new TasteSpottingClone.Collections.Posts(data.categories);
    data.categories = categories;
    return data
  },
  
  // toJSON: function(){
  //   var json = Backbone.Model.prototype.toJSON.call(this);
  //   json.categories = this.categories.toJSON();
  //   return json
  // }
});
