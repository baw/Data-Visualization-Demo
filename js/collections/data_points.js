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
    
    removeLocation: function () {
        this._locationAccessor = "country";
        this.removeFilter("location");
    },
    
    setUSA: function () {
        this._locationAccessor = "state";
        
        this.addFilter("location", function (dp) {
            return dp.country === "USA";
        });
    },
    
    locationData: function () {
        var that = this;
        var groupBy = this.groupBy(function (dp) {
            return dp.get(that._locationAccessor);
        });
        
        return _(groupBy).reduce(this._reduceToPercents, {});
    },
    
    _locationAccessor: "country",
    
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
