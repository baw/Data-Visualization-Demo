DVD.Collections.DataPoints = Backbone.Collection.extend({
    model: DVD.Models.DataPoints,
    url: "/data/data_with_locations.min.json",
    
    genderCount: function () {
        return this.countBy("gender");
    },
    
    withinPastDays: function (numDays) {
        var startDate = new Date(DVD.today);
        startDate.setDate(DVD.today.getDate() - numDays);
        
        return this.filter(function (dp) {
            var normalizedDate = dp.get("date");
            normalizedDate.setHours(0);
            normalizedDate.setMinutes(0);
            normalizedDate.setSeconds(0);
            
            return startDate <= normalizedDate && normalizedDate <= DVD.today;
        });
    }
});