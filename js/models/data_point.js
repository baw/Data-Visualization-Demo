DVD.Models.DataPoints = Backbone.Model.extend({
    parse: function (jsonResponse) {
        if (jsonResponse.date && jsonResponse.time) {
            var dateString = jsonResponse.date + " " + jsonResponse.time;
            jsonResponse.date = new Date(dateString);
            
            delete jsonResponse.time;
        }
        
        return jsonResponse;
    }
});