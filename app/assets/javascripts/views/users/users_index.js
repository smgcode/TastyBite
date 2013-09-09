TasteSpottingClone.Views.UsersIndex = Backbone.View.extend({

  template: JST['users/index'],
  
  render: function (){
    this.$el.html(this.template({ 
      collection: this.collection
    }));
    return this;
  }

});