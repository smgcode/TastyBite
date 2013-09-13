TasteSpottingClone.Views.PostsDetails = Backbone.View.extend({

  template: JST['posts/details'],

  className: "tile",

  render: function (){
    this.$el.html( this.template({
      model: this.model
    }));
    this.$el.attr("data-id", this.model.get("id"));
    this.$el.addClass("five columns");
    return this;
  }
});