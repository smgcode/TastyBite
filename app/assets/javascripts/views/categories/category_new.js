TasteSpottingClone.Views.CategoriesNew = Backbone.View.extend({

  events: {
    "submit #new-category-form": "submitNewCategory",
  },

  template: JST['categories/new'],
  
  render: function (){
    this.$el.empty()
    this.$el.prepend(this.template());
    return this;
  },
  
  submitNewCategory: function(event){
    event.preventDefault();
    var attributes = $("#new-category-form").serializeJSON().category;
    this.model.set(attributes);
    this.collection.add(this.model);
    
    var that = this;
    this.model.save(null, {
      success: function(){
        console.log("created a new category")
        Backbone.history.navigate("#/");
      },
      error: function(){ 
        console.log("Could not add to collection.");
      }
    });
  }
});
