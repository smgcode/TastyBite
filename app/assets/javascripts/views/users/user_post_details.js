TasteSpottingClone.Views.UsersPostsDetails = Backbone.View.extend({

  template: JST['posts/details'],

  className: "tile",

  render: function (){
    this.$el.html( this.template({ model: this.model }));
    return this;
  }
});