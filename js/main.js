window.DVD = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    Utl: {},
    today: new Date("July 31, 2014"),
    
    initialize: function () {
        var $content = $("#content");
        new DVD.Routers.Router({
            "$rootEl": $content
        });
        
        Backbone.history.start();
    }
};