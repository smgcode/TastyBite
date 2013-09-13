TasteSpottingClone.Views.UsersFavorites = Backbone.View.extend({
  
  usersCollection: null,
  
  className: "clearfix",
  
  initialize: function(options){
    this.usersCollection = options.usersCollection;
  },
  
  render: function(){
    var that = this;
    var current_user_id = that.model.get("current_user_id");
    this.usersCollection
      .get(current_user_id)
      .get("favorites")
      .each( function (favorite){

      var postView = new TasteSpottingClone.Views.PostsDetails({
        model: that.collection.get(favorite.get("post_id"))
      });
      that.$el.prepend(postView.render().$el);
    });
    this.$el.prepend(
      "<h3>Posts favorited by: " +
      this.model.get("username") +
      "</h3>");
    
    return this;
  },
});