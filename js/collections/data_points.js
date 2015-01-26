DVD.Collections.DataPoints = DVD.Utl.FilteredCollection.extend({
    comparator: "date",
    model: DVD.Models.DataPoints,
    url: "data/data_with_locations.min.json",
    
    activityHourlyBreakdown: function () {
        var groupedByHour = this.groupBy(function (dp) {
          var date = new Date(dp.get("date"));
          date.setMinutes(0);
          date.setSeconds(0);
          
          return date.getTime();
        });
        
        var breakdown = [];
        _(groupedByHour).each(function (dps, time) {
            var sum = 0;
            var total = dps.length;
            
            _(dps).each(function (dp) {
                sum += parseInt(dp.get("activity"), 10);
            });
            
            breakdown.push([time, (sum / total) * 100]);
        });
        
        return breakdown;
    },
    
    clearGender: function () {
        this.removeFilter("gender");
    },
    
    deviceCount: function () {
        return this.countBy("device");
    },
    
    genderCount: function () {
        return this.countBy("gender");
    },
    
    oneGender: function (gender) {
        this.addFilter("gender", function (dp) {
            return dp.get("gender") === gender;
        });
    },
    
    withinPastDays: function (numDays) {
        var startDate = new Date(DVD.today);
        startDate.setDate(DVD.today.getDate() - numDays);
        
        this.addFilter("days", function (dp) {
            var normalizedDate = new Date(dp.get("date"));
            normalizedDate.setHours(0);
            normalizedDate.setMinutes(0);
            normalizedDate.setSeconds(0);
            
            return startDate <= normalizedDate && normalizedDate <= DVD.today;
        });
    },
    
    worldData: function () {
        this.removeFilter("location");
        
        var groupByCountry = this.groupBy(function (dp) {
            return dp.get("country");
        });
        
        var results = _(groupByCountry).reduce(this._reduceToPercents, {});
        console.log(results);
        return results;
    },
    
    usaData: function () {
        this.addFilter("location", function (dp) {
            return dp.country === "USA";
        });
        
        var groupByState = this.groupBy(function (dp) {
            return dp.get("state");
        });
        
        return _(groupByState).reduce(this._reduceToPercents, {});
    },
    
    _reduceToPercents: function (acc, dps, loc) {
        var total = dps.length;
        var sum = 0;
        
        _(dps).each(function (dp) {
            sum += dp.get("activity");
        });
        
        acc[loc] = (sum/total);
        
        return acc;
    }
});
