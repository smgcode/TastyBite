TasteSpottingClone.Views.PostsIndex = Backbone.View.extend({
  
  initialize: function(){
    var renderCallback = this.render.bind(this);
    this.listenTo(this.collection, "add", renderCallback);
  },

  template: JST['posts/index'],
  
  render: function (){
    var that = this;
    this.$el.html(this.template());
    this.collection.each( function (post) {
      var postView = new TasteSpottingClone.Views.PostsDetails({ model: post });
      that.$el.prepend(postView.render().el);
    });
    return this;
  }

});
