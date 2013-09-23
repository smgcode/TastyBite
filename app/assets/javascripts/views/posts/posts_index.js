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
    this.postFavoriteClick = new TasteSpottingClone.Views.PostsFavorite({
      usersCollection: this.usersCollection,
      favoritesCollection: this.favoritesCollection
    });
  },
  
  render: function (){
    this.$el.empty();
    var that = this;
    this.collection.each( function (post) {
      var postView = new TasteSpottingClone.Views.PostsDetails({
        model: post
      });
      that.$el.prepend(postView.render().$el);
      var favoriteView = new TasteSpottingClone.Views.PostsFavorite({
        el: that.$el,
        model: post,
        collection: that.collection,
        usersCollection: that.usersCollection,
        favoritesCollection: that.favoritesCollection
      });
      that.$el.prepend(favoriteView.render().$el);
    });
    this.$el.prepend(this.template());
    return this;
  },

  favoriteButton: function(event){
    this.postFavoriteClick.favoriteButton(event);
  },

  unfavoriteButton: function(event){
    this.postFavoriteClick.unfavoriteButton(event);
  }

});
