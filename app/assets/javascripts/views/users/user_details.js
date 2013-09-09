TasteSpottingClone.Views.UsersDetails = Backbone.View.extend({

  template: JST['users/details'],

  render: function (){
    this.$el.html( this.template({
      model: this.model
    }));

    return this;
  }
});