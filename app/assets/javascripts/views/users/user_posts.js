TasteSpottingClone.Views.UsersDetails = Backbone.View.extend({

  events: {
    "click button.edit": "editButton",
    "click button.delete": "deleteButton"
  },

  className: "clearfix",

  template: JST['users/details'],

  usersCollection: null,
  
  initialize: function(options){
    this.usersCollection = options.usersCollection;
  },

  render: function (){
    var that = this;
    this.model.get("posts").each( function (post){
      var postView = new TasteSpottingClone.Views.PostsDetails({ model: post });
      that.$el.prepend(postView.render().$el);
      that.renderButtons(that, post);
    });
    this.$el.prepend( this.template({ model: this.model }));
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
        .html("<i class='icon-edit'></i>")
        .attr("data-id", post.get("id"))
        .addClass("edit"));
      $post
        .append($("<button>")
        .html("<i class='icon-trash'></i>")
        .attr("data-id", post.get("id"))
        .addClass("delete"));
    }
  },
  
  editButton: function(event){
    console.log("clicked edit button!" + $(event.currentTarget).attr("data-id"));
    Backbone.history.navigate("#/posts/" + 
      $(event.currentTarget).attr("data-id") + 
      "/edit");
  },

  deleteButton: function(event){
    console.log("clicked delete button!" + $(event.currentTarget).attr("data-id"));
    Backbone.history.navigate("#/posts/" + 
      $(event.currentTarget).attr("data-id") + 
      "/delete");
  }
  
});