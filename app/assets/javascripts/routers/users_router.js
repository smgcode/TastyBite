TasteSpottingClone.Routers.Users = Backbone.Router.extend({

  userCollection: null,

  initialize: function(options){
    this.collection = options.collection;
  },
  
  routes: {
    "users": "index",
    "users/:id": "details"
  },
  
  index: function(){
    var view = new TasteSpottingClone.Views.UsersIndex({
      collection: this.collection
    });
    $("#content").html(view.render().$el);
  },

  details: function(id){

    var that = this;
    $.when(this.collection.fetch())
      .done(function(userData){
        var view = new TasteSpottingClone.Views.UsersDetails({
          model: that.collection.get(id)
        });
        $("#content").html(view.render().$el);
      })
      .fail(function(){
        console.log(arguments);
        console.log("failed fetching user's posts");
      });
    

  }
  
});
