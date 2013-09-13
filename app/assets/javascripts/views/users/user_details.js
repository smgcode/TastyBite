TasteSpottingClone.Views.UsersDetails = Backbone.View.extend({

  events: {
    "click button.edit": "editButton",
    "click button.delete": "deleteButton"
  },

  template: JST['users/details'],

  usersCollection: null,
  
  initialize: function(options){
    this.usersCollection = options.usersCollection;
  },

  render: function (){
    this.$el.empty();
    var that = this;
    this.model.get("posts").each( function (post){
      var postView = new TasteSpottingClone.Views.PostsDetails({ model: post });
      that.$el.prepend(postView.render().$el);
      that.renderButtons(that, post);
    });
    this.$el.prepend( this.template({ model: this.model }));
    
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
      "<h2>Posts favorited by: " + 
      this.model.get("username") +
      "</h2>");
    
    return this;
  },
  
  renderButtons: function(that, post){
    if (that.model.get("id") === that.model.get("current_user_id")){
      $post = that.$el
        .find(".tile")
        .filter("[data-id='" + post.get("id") + "']");
      $post
        .append($("<br>"));
      $post
        .append($("<button>")
        .html("Edit")
        .attr("data-id", post.get("id"))
        .addClass("edit"));
      $post
        .append($("<button>")
        .html("Delete")
        .attr("data-id", post.get("id"))
        .addClass("delete"));
    }
  },
  
  editButton: function(event){
    console.log("clicked edit button!" + $(event.target).attr("data-id"));
    Backbone.history.navigate("#/posts/" + 
      $(event.target).attr("data-id") + 
      "/edit");
  },

  deleteButton: function(event){
    console.log("clicked delete button!" + $(event.target).attr("data-id"));
    Backbone.history.navigate("#/posts/" + 
      $(event.target).attr("data-id") + 
      "/delete");
  }
  
});