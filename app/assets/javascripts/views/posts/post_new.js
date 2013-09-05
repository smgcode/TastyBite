TasteSpottingClone.Views.PostsNew = Backbone.View.extend({
  
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
    
    var that = this;
    this.model.save(null, {
      success: function(rsp){
        that.model.set(rsp);
        console.log("Added model to collection!"); 
        Backbone.history.navigate("#/");            
      },
      
      error: function(){ 
        console.log("Could not add to collection.");
        // TODO should warn user could not submit data.
      }
    })
  }
});
