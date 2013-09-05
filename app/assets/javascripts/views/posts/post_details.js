TasteSpottingClone.Views.PostsDetails = Backbone.View.extend({

  render: function (){
    this.$el.html(
      JST['posts/details']({
        model: this.model
      })
    );
    return this;
  }
});