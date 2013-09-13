TasteSpottingClone.Views.CategoriesShow = Backbone.View.extend({
  
  render: function (){
    this.$el.empty();
    
    var that = this;
    this.collection.each( function (post){
      if( post.get("categories").findWhere({ id: that.model.get("id") }) ){
        var postView = new TasteSpottingClone.Views.PostsDetails({ model: post });
        that.$el.prepend(postView.render().$el);
      }
    });
    return this;
  }

});