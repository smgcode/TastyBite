TasteSpottingClone.Views.PostsEdit = Backbone.View.extend({
  
  // TODO File is identical to new post view. consider refactoring.
  className: "tile",
  
  events: {
    "submit #edit-post-form": "submitEditPost",
    "change input[type=file]": "encodeFile"
  },

  template: JST['posts/edit'],
  
  render: function (){
    this.$el.empty();
    this.$el.prepend(this.template({
      model: this.model
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
  
  submitEditPost: function(event){
    debugger
    event.preventDefault();
    
    var attributes = $("#edit-post-form").serializeJSON().post;
    this.model.set(attributes);
    
    var that = this;
    this.model.save({}, {
      success: function(model, response, options){
        Backbone.history.navigate("#/");
      },
      error: function(){ 
        console.log(arguments);
        console.log("Could not Edit collection.");
      }
    });
  }
});
