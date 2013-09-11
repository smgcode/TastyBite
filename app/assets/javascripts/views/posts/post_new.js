TasteSpottingClone.Views.PostsNew = Backbone.View.extend({
  
  className: "tile",
  
  events: {
    "submit #new-post-form": "submitNewPost",
    "change input[type=file]": "encodeFile"
  },

  template: JST['posts/new'],
  
  render: function (){
    this.$el.empty()
    
    this.$el.prepend(this.template());
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
  
  // TODO When waiting for success. Change button to say submitting and
  // disable new submitting until success or error. This will prevent
  // the user from submitting every time they hit the button while waiting.
  // other solution: validate on db.
  submitNewPost: function(event){
    event.preventDefault();
    var attributes = $("#new-post-form").serializeJSON().post;
    this.model.set(attributes);
    this.collection.add(this.model);
    
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
