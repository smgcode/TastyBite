TasteSpottingClone.Views.PostsIndex = Backbone.View.extend({

  //TODO setup listen to to have index auto render.

  template: JST['posts/index'],
  
  render: function (){
    var that = this;

    this.$el.html(this.template());

    this.collection.each( function (post) {
      var postView = new TasteSpottingClone.Views.PostsDetails({
        model: post
      });
      that.$el.append(postView.render().el);
    });
    return this;
  }

});
