DVD.Collections.DataPoints = Backbone.Collection.extend({
    comparator: "date",
    model: DVD.Models.DataPoints,
    url: "/data/data_with_locations.min.json",
    
    activityHourlyBreakdown: function () {
        var groupedByHour = this.groupBy(function (dp) {
          var date = new Date(dp.get("date"));
          date.setMinutes(0);
          date.setSeconds(0);
          
          return date.getTime();
        });
        
        var breakdown = {};
        _(groupedByHour).each(function (dps, time) {
            var sum = 0;
            var total = dps.length;
            
            _(dps).each(function (dp) {
                sum += parseInt(dp.get("activity"), 10);
            });
            
            breakdown[time] = sum / total;
        });
        
        return breakdown;
    },
    
    deviceCount: function () {
        return this.countBy("device");
    },
    
    genderCount: function () {
        return this.countBy("gender");
    },
    
    oneGender: function (gender) {
        var filtered = this.filter(function (dp) {
            return dp.get("gender") === gender;
        });
        
        return new DVD.Collections.DataPoints(filtered);
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