DVD.Collections.DataPoints = Backbone.Collection.extend({
    model: DVD.Models.DataPoints,
    url: "/data/data_with_locations.min.json"
});