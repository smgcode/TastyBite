TasteSpottingClone.Views.PostsDetails = Backbone.View.extend({

  className: "tile",

  render: function (){
    this.$el.html(
      JST['posts/details']({
        model: this.model
      })
    );
    return this;
  }
});