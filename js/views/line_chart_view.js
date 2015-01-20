DVD.Views.LineChartView = Backbone.View.extend({
    initialize: function () {
        this.listenTo(this.collection, "sync", this.createChart);
    },
    
    render: function () {
        this.createChart();
        
        return this;
    },
    
    createChart: function () {
        d3.select(this.el).select("svg").remove();
        
        var data = this.collection.activityHourlyBreakdown();
        
        var margins = {
            "top": 20,
            "right": 20,
            "bottom": 20,
            "left": 20
        };
        this.width = this.$el.width() - margins.left - margins.right;
        this.height = this.$el.height() - margins.top - margins.bottom;
        
        this.chart = d3.select(this.el).append("svg")
                .attr("width",  margins.left + this.width + margins.right)
                .attr("height", margins.top + this.height + margins.bottom)
            .append("g")
                .attr("transform",
                      "translate(" + margins.left + "," + margins.top + ")");
        
        var dates = _(data).map(function (d) {
            return d[0];
        });
        
        var xScale = d3.time.scale()
            .domain(d3.extent(dates))
            .range([0, this.width]);
        
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");
        
        var yScale = d3.scale.linear()
            .domain([100, 0])
            .range([0, this.height]);
        
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
            
        this.line = d3.svg.line()
            .x(function (d) { return xScale(d[0]); })
            .y(function (d) { return yScale(d[1]); });
            
        this.chart.append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(20," + this.height + ")")
            .call(xAxis);
        
        this.chart.append("g")
            .attr("class", "yAxis")
            .attr("transform", "translate(20, 0)")
            .call(yAxis);
        
        this.chart.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("transform", "translate(20, 0)")
            .attr("d", this.line);
    },
    
    updateWithDifferentData: function (data) {
        this.collection = data;
        
        this.createChart();
    }
});