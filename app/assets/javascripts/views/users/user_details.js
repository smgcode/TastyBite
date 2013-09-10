TasteSpottingClone.Views.UsersDetails = Backbone.View.extend({

  template: JST['users/details'],

  render: function (){
    this.$el.empty();
    
    var that = this;
    this.model.get("posts").each( function (post){

      var postView = new TasteSpottingClone.Views.PostsDetails({ model: post });
      that.$el.prepend(postView.render().$el);
    });
    
    this.$el.prepend( this.template({ model: this.model }));
    return this;
  }
});