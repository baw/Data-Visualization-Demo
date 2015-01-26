DVD.Views.MapView = Backbone.View.extend({
    template: JST["map_view"],
    initialize: function () {
        this.listenTo(this.collection, "sync", this.createMap.bind(this, "world"));
    },
    
    render: function () {
        var renderContent = this.template();
        
        this.$el.html(renderContent);
        
        return this;
    },
    
    createMap: function (location) {
        if (typeof location === "undefined") {
            location = "world";
        }
        
        var data;
        if (location === "world") {
            data = this.collection.worldData();
        } else {
            data = this.collection.usaData();
        }
        
        var mapData = this.createMapData(data);
        
        this.map = new Datamap({
            scope: location,
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
    }
});