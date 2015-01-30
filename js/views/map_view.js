DVD.Views.MapView = Backbone.View.extend({
    events: {
        "click #usa_button": "updateLocation",
        "click #world_button": "updateLocation"
    },
    template: JST["map_view"],
    initialize: function () {
        this.listenTo(this.collection,
                      "sync filtered",
                      this.createMap.bind(this));
        this.location = "world";
    },
    
    render: function () {
        var renderContent = this.template();
        
        this.$el.html(renderContent);
        
        return this;
    },
    
    createMap: function (location) {
        this.$("#map").html("");
        
        var data = this.collection.locationData();
        
        var mapData = this.createMapData(data);
        
        this.map = new Datamap({
            scope: this.location,
            element: this.$("#map").get(0),
            fills: mapData.fills,
            data: mapData.data,
            geographyConfig: {
                popupOnHover: true,
                popupTemplate: function(geography, data) {
                    var results = '<div class="hoverinfo"><strong>' +
                        geography.properties.name +
                        '</strong>';
                    if (data !== null && data !== undefined) {
                        results += " - " +
                            (data.count * 100).toFixed(2) + "%" +
                            '</div>';
                    }
                    
                    return results;
                }
            }
        });
    },
    
    createMapData: function (data) {
        var counts = _(data).map(function (count, key) {
            return count;
        });
        
        var color = d3.scale.linear()
            .domain(d3.extent(counts))
            .range(["#FFFFFF", "#000000"]);
        
        return _(data).reduce(function (acc, count, loc) {
            acc.fills[loc] = color(count);
            acc.data[loc] = {
                "fillKey": loc,
                "count": count
            };
            
            return acc;
        }, { "fills": { "defaultFill": "blue" }, "data": {} });
    },
    
    updateLocation: function (e) {
        var $target = $(e.target);
        var location = $target.data("location");
        
        if (this.map.options.scope !== location) {
            this.$("#usa_button, #world_button").removeClass("selected");
            $target.addClass("selected");
            this.location = location;
            
            if (location === "usa") {
                this.collection.setUSA();
            } else if (location === "world") {
                this.collection.removeLocation();
            } else {
                throw new Error("location must be either 'usa' or 'world'");
            }
        }
    }
});