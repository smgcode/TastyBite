TasteSpottingClone.Views.UsersDetails = Backbone.View.extend({

  events: {
    "click button.edit": "editButton",
    "click button.delete": "deleteButton"
  },

  template: JST['users/details'],

  render: function (){
    this.$el.empty();
    
    var that = this;
    this.model.get("posts").each( function (post){
      var postView = new TasteSpottingClone.Views.PostsDetails({ model: post });
      that.$el.prepend(postView.render().$el);
      
      
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
    });
    
    this.$el.prepend( this.template({ model: this.model }));
    return this;
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