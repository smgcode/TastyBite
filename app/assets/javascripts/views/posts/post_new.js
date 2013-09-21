TasteSpottingClone.Views.PostsNew = Backbone.View.extend({
  
  events: {
    "submit #new-post-form": "submitNewPost",
    "change input[type=file]": "encodeFile"
  },

  template: JST['posts/new'],
  
  categoriesCollection: null,
  
  initialize: function(options){
    this.categoriesCollection = options.categoriesCollection
  },
  
  render: function (){

    this.$el.empty()
    this.$el.prepend(this.template({
      categoriesCollection: this.categoriesCollection
    }));
    return this;
  },
  
  encodeFile: function(event){
    var reader = new FileReader();
    var that = this;
    reader.onload = function(){ 
      that.model.set({ post_photo: this.result });
    }
    reader.readAsDataURL(event.currentTarget.files[0]);
  },
  
  submitNewPost: function(event){
    event.preventDefault();
    
    var attributes = $("#new-post-form").serializeJSON().post;
    this.model.set(attributes);
    this.collection.add(this.model);
    if (this.model.post_photo != "") {
      $("#submit_post")
        .html("<i class='icon-spinner icon-spin icon-large'></i>");
    }
    $("#submit_button").attr("type", "hidden")
    var that = this;
    this.model.save(null, {
      success: function(){
        Backbone.history.navigate("#/");
      },

      error: function(){ 
        console.log("Could not add to collection.");
      }
    });
  }
});
