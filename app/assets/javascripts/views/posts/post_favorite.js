TasteSpottingClone.Views.PostsFavorite = Backbone.View.extend({
  
  usersCollection: null,
  favoritesCollection: null,
  
  initialize: function(options){
    this.usersCollection = options.usersCollection;
    this.favoritesCollection = options.favoritesCollection;
  },
  
  render: function (){
    var that = this;
    $.when(this.usersCollection.fetch())
      .done(function(userData){
        that.renderFavoriteButtons(that);
      })
      .fail(function(){
        console.log(arguments);
        console.log("failed fetching users collection");
      });
    return this;
  },
  
  renderFavoriteButtons: function(that){
    var current_user_id = that.usersCollection.first().get("current_user_id");
    if (current_user_id){
      var $tile = that.$el.find(".tile");
      var $post = $tile.filter("[data-id='" + that.model.get("id") + "']");
      $post.append($("<br>"));
      var favs = that.usersCollection.get(current_user_id).get("favorites");
      if (favs.findWhere({ post_id: that.model.id }) ){
        $post
          .append($("<button>")
          .html("<i class='icon-heart'></i>")
          .attr("data-id", that.model.get("id"))
          .addClass("unfavorite"));
      }
      else{
        $post
          .append($("<button>")
          .html("<i class='icon-heart-empty'></i> ")
          .attr("data-id", that.model.get("id"))
          .addClass("favorite"));
      }
    }
  },
  
  favoriteButton: function(event){
    var favoriteId = $(event.currentTarget).attr("data-id")
    $(".favorite")
      .filter("[data-id='" + favoriteId + "']")
      .toggleClass("favorite")
      .toggleClass("unfavorite")
      .html("<i class='icon-heart'></i>")
    var favoritePost = new TasteSpottingClone.Models.Favorite()
    var attributes = {
      post_id: parseInt(favoriteId),
      user_id: this.usersCollection.first().get("current_user_id")
    };
    favoritePost.set(attributes);
    this.favoritesCollection.add(favoritePost);
    favoritePost.save(null, {
      success: function(){
        console.log("Favorited post: " + favoriteId);
      },
      error: function(){
        console.log("Failed to favorite post.");
      }
    });
  },
  
  unfavoriteButton: function(event){
    var unfavoriteId = $(event.currentTarget).attr("data-id")
    $(".unfavorite")
      .filter("[data-id='" + unfavoriteId + "']")
      .toggleClass("favorite")
      .toggleClass("unfavorite")
      .html("<i class='icon-heart-empty'></i> ")
    var toUnfavorite = this.favoritesCollection.findWhere({
      post_id: parseInt(unfavoriteId),
      user_id: this.usersCollection.first().get("current_user_id")
    });
    toUnfavorite.destroy({
      success: function(model, response, options){
        console.log("Unfavorited post: " + unfavoriteId);
      },
      error: function(model, xhr, options){
        console.log("Failed to unfavorite post.");
      }
    });
  },

});
