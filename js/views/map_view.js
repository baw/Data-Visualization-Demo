DVD.Views.MapView = Backbone.View.extend({
    template: JST["map_view"],
    
    render: function () {
        var renderContent = this.template();
        
        this.$el.html(renderContent);
        
        setTimeout(this.createMap.bind(this), 0);
        
        return this;
    },
    
    createMap: function (location) {
        if (typeof location === "undefined") {
            location = "world";
        }
        
        this.map = new Datamap({
            scope: location,
            element: this.$("#map").get(0)
        });
    }
});