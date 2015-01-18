DVD.Collections.DataPoints = Backbone.Collection.extend({
    comparator: "date",
    model: DVD.Models.DataPoints,
    url: "/data/data_with_locations.min.json",
    
    deviceCount: function () {
        return this.countBy("device");
    },
    
    genderCount: function () {
        return this.countBy("gender");
    },
    
    withinPastDays: function (numDays) {
        var startDate = new Date(DVD.today);
        startDate.setDate(DVD.today.getDate() - numDays);
        
        var filtered =  this.filter(function (dp) {
            var normalizedDate = new Date(dp.get("date"));
            normalizedDate.setHours(0);
            normalizedDate.setMinutes(0);
            normalizedDate.setSeconds(0);
            
            return startDate <= normalizedDate && normalizedDate <= DVD.today;
        });
        
        return new DVD.Collections.DataPoints(filtered);
    }
});