TasteSpottingClone.Views.PostsIndex = Backbone.View.extend({
  
  events: {
    "click button.favorite": "favoriteButton",
    "click button.unfavorite": "unfavoriteButton"
  },
  
  usersCollection: null,
  favoritesCollection: null,
  template: JST['posts/index'],
  
  initialize: function(options){
    var renderCallback = this.render.bind(this);
    this.listenTo(this.collection, "add", renderCallback);
    this.usersCollection = options.usersCollection;
    this.favoritesCollection = options.favoritesCollection;
  },
  
  render: function (){
    this.$el.empty();
    var that = this;
    this.collection.each( function (post) {
      var postView = new TasteSpottingClone.Views.PostsDetails({ model: post });
      that.$el.prepend(postView.render().$el);
      that.renderFavoriteButtons(that, post);
    });
    this.$el.prepend(this.template());
    return this;
  },
  
  renderFavoriteButtons: function(that, post){
    $.when(this.usersCollection.fetch())
      .done(function(userData){
        var current_user_id = that.usersCollection.first().get("current_user_id");
        if (current_user_id){
          $post = that.$el
            .find(".tile")
            .filter("[data-id='" + post.get("id") + "']");
          $post
            .append($("<br>"));
          if (that
            .usersCollection
            .get(current_user_id)
            .get("favorites")
            .findWhere({ post_id: post.id }) ){
            $post
              .append($("<button>")
              .html("<i class='icon-heart'></i>")
              .attr("data-id", post.get("id"))
              .addClass("unfavorite"));
          }
          else{
            $post
              .append($("<button>")
              .html("<i class='icon-heart-empty'></i> ")
              .attr("data-id", post.get("id"))
              .addClass("favorite"));
          }
        }
      })
      .fail(function(){
        console.log(arguments);
        console.log("failed fetching users collection");
      });
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
