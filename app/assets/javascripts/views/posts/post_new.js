TasteSpottingClone.Views.PostsNew = Backbone.View.extend({

  _temp: null,
  
  events: {
    "submit #new-post-form": "submitNewPost",
    "change input[type=file]": "encodeFile"
  },

  template: JST['posts/new'],
  
  render: function (){
    this.$el.html(this.template());
    return this;
  },
  
  encodeFile: function(event){
    // http://stackoverflow.com/questions/4100927/chrome-filereader
    var that = this;
    var reader = new FileReader();
    reader.onload = function(){ that._temp = this.result; }
    reader.readAsDataURL(event.currentTarget.files[0]);
  },
  
  submitNewPost: function(event){
    event.preventDefault();

    var attributes = $("#new-post-form").serializeJSON().post;
    var model = new TasteSpottingClone.Models.Post;
    jQuery.extend(attributes, { post_photo: this._temp });
    model.set(attributes);
    
    this.collection.create(attributes, {
      success: function(){ console.log("Added model to collection!"); },
      error: function(){ console.log("Could not add to collection."); }
    })
    Backbone.history.navigate("#/");    
    // TODO after this, setup listeners on post_index.js
  }
});